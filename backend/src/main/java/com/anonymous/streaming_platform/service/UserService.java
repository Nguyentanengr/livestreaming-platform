package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.constant.UserStatus;
import com.anonymous.streaming_platform.dto.event.UserDeleteEvent;
import com.anonymous.streaming_platform.dto.response.FollowedUserResponse;
import com.anonymous.streaming_platform.dto.response.ListFollowedUserResponse;
import com.anonymous.streaming_platform.dto.response.ListRcmUserResponse;
import com.anonymous.streaming_platform.dto.response.RcmUserResponse;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import com.anonymous.streaming_platform.service.kafkaMessenger.MessageProducer;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AuthContextProvider authContext;
    private final UserMapper userMapper;
    private final MessageProducer messageProducer;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final JwtBlacklistService jwtBlacklistService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(Error.UNAUTHORIZED.getMessage()));
    }

    public ListFollowedUserResponse retrieveFollowedUsers(String key, Pageable pageable) {

        // Trường hợp user chưa đăng nhập
        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Page<User> userPages = userRepository
                .findFollowedUsersWithKeyAndNotDeleted(currentUserId, key, pageable);

        List<User> users = userPages.getContent();
        log.info("Retrieved {} followed users with key {}.", users.size(), key);

        // Map sang response
        List<FollowedUserResponse> responses = users.stream()
                .map((user) -> userMapper.mapToFollowedUserResponse(user, Boolean.TRUE))
                .toList();

        return ListFollowedUserResponse.builder()
                .users(responses)
                .currentPage(userPages.getNumber())
                .totalPages(userPages.getTotalPages())
                .build();
    }

    public ListRcmUserResponse retrieveRecommendedUsers(String key, Pageable pageable) {

        // null khi người request là khách
        Long currentUserId = authContext.getUserId().orElse(null);

        Page<User> userPages = userRepository
                .findRecommendedWithKeyAndNotDeleted(currentUserId, key, pageable);

        List<User> users = userPages.getContent();
        log.info("Retrieved {} recommended users with key {}.", users.size(), key);

        // Map sang response
        List<RcmUserResponse> responses = users.stream()
                .map((user) -> userMapper.mapToRcmUserResponse(user, Boolean.FALSE))
                .toList();

        return ListRcmUserResponse.builder()
                .users(responses)
                .currentPage(userPages.getNumber())
                .totalPages(userPages.getTotalPages())
                .build();
    }

    @Transactional
    public void deleteUser(String refreshToken) { // dùng cho user để tự xóa tài khoản của mình

        // Lấy thông tin user hiện tại
        User user = authContext.getUser()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        user.setDeletedAt(LocalDateTime.now());
        user.setStatus(UserStatus.DELETED);
        userRepository.save(user);

        // Gửi message qua kafka để vô hiệu hóa các thông tin liên quan đến user hiện tại trong mongodb
        messageProducer.sendMessage(KafkaTopic.USER_DELETE_TOPIC
                , new UserDeleteEvent(user.getId()));

        // Logout khi xóa thông tin thành công.
        JWTClaimsSet claimsSet = jwtTokenGenerator.verifyToken(refreshToken);
        jwtBlacklistService.addTokenToBlacklist(claimsSet.getJWTID(), claimsSet.getExpirationTime());
    }

}

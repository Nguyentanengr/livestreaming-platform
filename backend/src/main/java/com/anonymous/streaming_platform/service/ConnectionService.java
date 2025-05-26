package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.dto.event.NotificationEvent;
import com.anonymous.streaming_platform.entity.mysql.Connection;
import com.anonymous.streaming_platform.entity.mysql.ConnectionId;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mysql.ConnectionRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import com.anonymous.streaming_platform.service.kafkaMessenger.MessageProducer;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final CacheService cacheService;
    private final ConnectionRepository connectionRepository;
    private final AuthContextProvider authContext;
    private final UserRepository userRepository;
    private final MessageProducer messageProducer;
    private final UserMapper userMapper;

    // Kiểm tra user hiện tại có follow với following id không
    public Boolean isConnectionExist(Long followingId) {

        // Lấy thông tin người dùng đang đăng nhập
        Optional<User> currentUser = authContext.getUser();
        Boolean isFollowing;

        // Nếu người dùng không phải là khách
        if (currentUser.isPresent()) {
            isFollowing = connectionRepository.isConnectionExist(ConnectionId.builder()
                    .followerId(currentUser.get().getId())
                    .followingId(followingId)
                    .build());
            log.info("FollowerId {}, followingId {} is: {}."
                    , currentUser.get().getId(), followingId, isFollowing);
            return isFollowing;
        }
        return Boolean.FALSE;
    }

    @Transactional
    public void createConnection(String username) {

        // Lấy thông tin user hiện tại.
        User follower = authContext.getUser()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        // Kiểm tra thông tin người được follow

        User following = userRepository.findByUsernameAndNotDeleted(username)
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));

        var connection = Connection.builder()
                .id(ConnectionId.builder()
                        .followerId(follower.getId())
                        .followingId(following.getId())
                        .build())
                .follower(follower)
                .following(following)
                .followedAt(LocalDateTime.now())
                .build();

        var response = connectionRepository.save(connection);

        // Tăng followCount trong user
        following.setFollowersCount(following.getFollowersCount() + 1);
        userRepository.save(following);

        log.info("Created connection with followed at {}.", response.getFollowedAt());

        // Bắn message kafka để xử lý thông báo
        messageProducer.sendMessage(KafkaTopic.NOTIFICATION_TOPIC, NotificationEvent.builder()
                .type(NotiType.FOLLOW)
                .receiverId(following.getId())
                .user(userMapper.mapToRelatedUser(follower))
                .build());
    }

    @Transactional
    public void deleteConnection(String username) {

        // Lấy thông tin id user hiện tại.
        Long followerId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        // Kiểm tra thông tin người được follow
        User following = userRepository.findByUsernameAndNotDeleted(username)
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));

        var connectionId = ConnectionId.builder()
                .followerId(followerId)
                .followingId(following.getId())
                .build();

        connectionRepository.deleteById(connectionId);
        log.info("Deleted connection between followerId {} and followingId {}."
                , followerId, following.getId());

        following.setFollowersCount(Math.max(0, following.getFollowersCount() - 1));
        userRepository.save(following);

    }
}

package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.dto.request.ChangePasswordRequest;
import com.anonymous.streaming_platform.dto.request.EditProfileRequest;
import com.anonymous.streaming_platform.dto.event.UserProfileEditEvent;
import com.anonymous.streaming_platform.dto.response.UserProfileResponse;
import com.anonymous.streaming_platform.dto.response.UserSummaryResponse;
import com.anonymous.streaming_platform.entity.mysql.Link;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.ConflictDataException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mysql.LinkRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import com.anonymous.streaming_platform.service.kafkaMessenger.MessageProducer;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {

    public static final String USER_PROFILE_PREFIX = "user:profile:";
    public static final String USER_SUMMARY_PREFIX = "user:summary:";

    private static final long USER_PROFILE_TTL = 1; // 5 Minutes
    private static final long USER_SUMMARY_TTL = 1; // 5 Minutes

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CacheService cacheService;
    private final ConnectionService connectionService;
    private final AuthContextProvider authContext;
    private final LinkRepository linkRepository;
    private final PasswordEncoder passwordEncoder;
    private final StorageService storageService;
    private final MessageProducer messageProducer;

    public UserProfileResponse retrieveUserProfile(String username) {

        // Tạo key để kiểm tra có sẵn trong cache chưa
        String profileCacheKey = USER_PROFILE_PREFIX + username;

        // Kiểm tra cache cho user profile
        Optional<UserProfileResponse> cachedUser = cacheService.get(profileCacheKey, UserProfileResponse.class);

        // Lấy thông tin trong cache nếu có hoặc truy vấn database
        UserProfileResponse userProfileResponse;

        if (cachedUser.isPresent()) {
            log.info("Retrieved user profile from cache for key {}.", profileCacheKey);
            userProfileResponse = cachedUser.get();
            boolean isFollowing = connectionService.isConnectionExist(cachedUser.get().id());
            log.info("--------------------------Retrieved isFollowing: {}", isFollowing);
            return userProfileResponse.withIsFollowing(isFollowing);
        } else {

            // Lấy user nếu tồn tại hoặc chưa bị xóa
            User user = userRepository.findWithLinksByUsernameAndNotDeleted(username)
                    .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));
            // Lưu vào cache
            userProfileResponse = userMapper.mapToUserProfileResponse(user);

            cacheService.set(profileCacheKey, userProfileResponse, USER_PROFILE_TTL, TimeUnit.MINUTES);
            log.info("Retrieved user profile from database and cached with key {}.", profileCacheKey);
        }

        // Sau khi lấy được response từ cache / database -> set isFollowing
        Boolean isFollowing = connectionService.isConnectionExist(userProfileResponse.id());
        return userProfileResponse.withIsFollowing(isFollowing);
    }

    public UserProfileResponse retrieveMyProfile() {
        // Lấy thông tin email từ auth context
        String email = authContext.getEmail().get();

        User user = userRepository.findWithLinksByEmailAndNotDeleted(email)
                .orElseThrow(() -> new AuthenticationException(Error.UNAUTHORIZED));

        return userMapper.mapToUserProfileResponse(user);
    }

    @Transactional
    public UserProfileResponse editUserProfile(EditProfileRequest request, MultipartFile avatar) {

        // Lấy thông tin username từ auth context
        String email = authContext.getEmail().get();

        // Lấy thông tin user dựa vào username
        User user = userRepository.findWithLinksByEmailAndNotDeleted(email)
                .orElseThrow(() -> new AuthenticationException(Error.UNAUTHORIZED));
        log.info("Retrieved current user with userId: {} from database.", user.getId());

        // Kiểm tra username được update đã tồn tại chưa
        Boolean isExistUsername = userRepository.existsByUsernameWithoutThis(request.username(), user.getId());
        if (isExistUsername) {
            log.warn("Username {} is already taken.", request.username());
            throw new ConflictDataException(Error.USERNAME_EXISTS, request.username());
        }

        // Bắt đầu update dữ liệu
        user.setUsername(request.username());
        user.setBio(request.bio());
        user.setUpdatedAt(LocalDateTime.now());

        // Upload ảnh avatar lên S3 và update dữ liệu nếu có
        if (avatar != null) {
            log.info("Receive avatar file from client");
            String avatarUrl = storageService.uploadFile(avatar, StorageService.AVATAR_FILE_TYPE);
            user.setAvatar(avatarUrl);
        }

        String youtube = request.link().youtube();
        String tiktok = request.link().tiktok();
        String discord = request.link().discord();

        // Logic cập nhật link
        if ((youtube == null || youtube.isBlank()) && (tiktok == null || tiktok.isBlank()) && (discord == null || discord.isBlank())) {
            if (user.getLink() != null) {
                // Xóa link trong hệ thống
                linkRepository.delete(user.getLink());
                log.info("Deleted link from database for userId: {}.", user.getId());
            }
            user.setLink(null); // Gỡ bỏ khóa ngoại
            log.info("Removed link from user profile for userId: {}.", user.getId());
        } else {
            if (user.getLink() == null) {
                // Tạo link mới
                Link link = Link.builder()
                        .user(user)
                        .build();
                user.setLink(link);
            }
            user.getLink().setDiscord(discord);
            user.getLink().setTiktok(tiktok);
            user.getLink().setYoutube(youtube);
            log.info("Updated link in user profile for userId: {}.", user.getId());
        }

        // Lưu thông tin user
        User editedUser = userRepository.save(user);
        userRepository.flush(); // Buộc flush để commit UPDATE
        log.info("Updated user profile for userId: {}.", editedUser.getId());

        // Cache dữ liệu mới vào redis tránh mất sự nhất quán dữ liệu khi cập nhật trong mongodb
        var userSummaryResponse = userMapper.mapToUserSummaryResponse(editedUser);
        cacheService.set(USER_SUMMARY_PREFIX + editedUser.getUsername(), userSummaryResponse
                , USER_SUMMARY_TTL, TimeUnit.MINUTES);

        // Sau khi lưu thông tin user thành công trong mysql
        // -> bắn message qua kafka để update dữ liệu trong mongodb
        var event = UserProfileEditEvent.builder()
                .id(editedUser.getId())
                .username(editedUser.getUsername())
                .avatar(editedUser.getAvatar())
                .build();

        messageProducer.sendMessage(KafkaTopic.USER_PROFILE_EDIT_TOPIC, event);
        log.info("Sent message to kafka topic {} with content {}."
                , KafkaTopic.USER_PROFILE_EDIT_TOPIC, event);

        String profileCacheKey = USER_PROFILE_PREFIX + editedUser.getUsername();
        var userProfileResponse = userMapper.mapToUserProfileResponse(editedUser);
        cacheService.set(profileCacheKey, userProfileResponse, USER_PROFILE_TTL, TimeUnit.MINUTES);
        log.info("Cached user profile with key {}.", profileCacheKey);

        return userProfileResponse;
    }

    @Transactional
    public UserProfileResponse changePassword(ChangePasswordRequest request) {

        // Lấy thông tin EMAIL từ context
        String email = authContext.getEmail().get();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException(Error.UNAUTHORIZED));

        log.info("Retrieved current user with userId: {} from database.", user.getId());

        // Kiểm tra mật khẩu cũ
        boolean isValidOldPassword = passwordEncoder.matches(request.oldPassword(), user.getPassword());
        if (!isValidOldPassword) {
            log.warn("Old password is not valid");
            throw new BusinessLogicException(Error.PASSWORD_OLD_INVALID);
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        User editedUser = userRepository.save(user);
        log.info("Updated user password for userId: {}.", editedUser.getId());

        return userMapper.mapToUserProfileResponse(editedUser);

    }
}

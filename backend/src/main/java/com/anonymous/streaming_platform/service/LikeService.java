package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.dto.event.NotificationEvent;
import com.anonymous.streaming_platform.entity.mysql.Like;
import com.anonymous.streaming_platform.entity.mysql.LikeId;
import com.anonymous.streaming_platform.entity.mysql.Reel;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.ReelMapper;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mysql.LikeRepository;
import com.anonymous.streaming_platform.repository.mysql.ReelRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import com.anonymous.streaming_platform.service.kafkaMessenger.MessageProducer;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final AuthContextProvider authContext;
    private final ReelRepository reelRepository;
    private final UserRepository userRepository;
    private final MessageProducer messageProducer;
    private final UserMapper userMapper;
    private final ReelMapper reelMapper;


    @Transactional
    public void createLike(String reelId) {

        var currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Reel reel = reelRepository.findVisibleReelById(currentUserId, reelId)
                .orElseThrow(() -> new EntityNotFoundException(Error.REEL_NOT_FOUND, reelId));

        User user = userRepository.getReferenceById(currentUserId);

        boolean isExist = likeRepository.existsById(new LikeId(reel.getId(), currentUserId));
        if (isExist) {
            throw new BusinessLogicException(Error.LIKE_REEL_EXISTS);
        }

        var like = Like.builder()
                .id(new LikeId(reel.getId(), currentUserId))
                .user(user)
                .reel(reel)
                .createdAt(LocalDateTime.now())
                .build();

        likeRepository.save(like);

        // Tăng like_count trong reel
        reel.setLikesCount(reel.getLikesCount() + 1);
        reelRepository.save(reel);

        log.info("Created like for reel {}.", reelId);

        // Bắn message kafka để xử lý thông báo
        messageProducer.sendMessage(KafkaTopic.NOTIFICATION_TOPIC, NotificationEvent.builder()
                .type(NotiType.LIKE_REEL)
                .receiverId(reel.getUser().getId())
                .user(userMapper.mapToRelatedUser(user))
                .reel(reelMapper.mapToRelatedReel(reel))
                .build());
    }

    @Transactional
    public void deleteLike(String reelId) {

        var currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Reel reel = reelRepository.findVisibleReelById(currentUserId, reelId)
                .orElseThrow(() -> new EntityNotFoundException(Error.REEL_NOT_FOUND, reelId));

        if (reel == null) return;

        var likeId = LikeId.builder()
                .reelId(reel.getId())
                .userId(currentUserId)
                .build();


        likeRepository.deleteById(likeId);

        // Giảm like_count trong reel
        reel.setLikesCount(Math.max(0, reel.getLikesCount() - 1));
        reelRepository.save(reel);

        log.info("Deleted like for reel {}.", reelId);
    }

}

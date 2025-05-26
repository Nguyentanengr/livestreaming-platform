package com.anonymous.streaming_platform.service.kafkaMessenger;

import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.dto.event.NotificationEvent;
import com.anonymous.streaming_platform.dto.request.NotificationCreateRequest;
import com.anonymous.streaming_platform.dto.response.NotificationResponse;
import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import com.anonymous.streaming_platform.mapper.NotificationMapper;
import com.anonymous.streaming_platform.mapper.ReelMapper;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mongodb.NotificationRepository;
import com.anonymous.streaming_platform.repository.mysql.ReelRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationConsumer implements MessageConsumer<NotificationEvent> {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final ReelRepository reelRepository;
    private final UserMapper userMapper;
    private final ReelMapper reelMapper;

    @Override
    @KafkaListener(topics = KafkaTopic.NOTIFICATION_TOPIC
            , groupId = "${spring.kafka.consumer.group-id}")
    public void consume(NotificationEvent event) {


        // Đảm bảo luôn có user và reel
        RelatedUser user = event.type() == NotiType.LIKE_COMMENT
                ? userMapper.mapToRelatedUser(userRepository.findById(event.user().getId()).orElseThrow())
                : event.user();

        RelatedReel reel = event.type() == NotiType.LIKE_COMMENT
                ? reelMapper.mapToRelatedReel(reelRepository.findById(event.reel().getId()).orElseThrow())
                : event.reel();


        NotificationResponse response = notificationService
                .createNotification(NotificationCreateRequest.builder()
                .receiverId(event.receiverId())
                .type(event.type())
                .user(user)
                .reel(reel)
                .build());

        simpMessagingTemplate.convertAndSend("/queue/notifications-" + event.receiverId(), response);
        log.info("Sent notification to user {} realtime.", event.receiverId());
    }

}

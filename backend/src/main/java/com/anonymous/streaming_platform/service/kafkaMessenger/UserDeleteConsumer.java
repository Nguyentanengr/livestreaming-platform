package com.anonymous.streaming_platform.service.kafkaMessenger;

import com.anonymous.streaming_platform.dto.event.UserDeleteEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserDeleteConsumer implements MessageConsumer<UserDeleteEvent> {

    private final MongoTemplate mongoTemplate;

    @Override
    @KafkaListener(topics = KafkaTopic.USER_DELETE_TOPIC
            , groupId = "${spring.kafka.consumer.group-id}")
    public void consume(UserDeleteEvent event) {

        try {
            // Cập nhật deleted at user trong tất cả các collections mongo
            String[] collections = {"chats", "notifications", "comments", "activity_feeds"};

            for (var collection : collections) {
                Query query = Query.query(Criteria.where("user._id").is(event.userId()));
                Update update = new Update()
                        .set("user.deleted_at", LocalDateTime.now());

                mongoTemplate.updateMulti(query, update, collection);
            }
            log.info("Deleted user in mongodb: {}", event.userId());

        } catch (Exception e) {
            log.error("An error occurred while consuming event from topic {}: {}",
                    KafkaTopic.USER_DELETE_TOPIC, e.getMessage(), e);
            throw new RuntimeException("Retryable error", e);
        }
    }
}

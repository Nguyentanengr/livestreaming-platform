package com.anonymous.streaming_platform.service.kafkaMessenger;


import com.anonymous.streaming_platform.dto.event.UserProfileEditEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileEditConsumer implements MessageConsumer<UserProfileEditEvent> {

    private final MongoTemplate mongoTemplate;

    @Override
    @KafkaListener(topics = KafkaTopic.USER_PROFILE_EDIT_TOPIC
            , groupId = "${spring.kafka.consumer.group-id}")
    public void consume(UserProfileEditEvent event) {

        try {
            long startTime = System.currentTimeMillis();
            log.info("Received event: {} from topic {}", event, KafkaTopic.USER_PROFILE_EDIT_TOPIC);

            // Update dữ liệu này trong mongodb
            String[] collections = {"chats", "notifications", "comments", "activity_feeds"};

            for (String collection : collections) {
                Query query = new Query(Criteria.where("user._id").is(event.id()));
                Update update = new Update()
                        .set("user._id", event.id())
                        .set("user.username", event.username())
                        .set("user.avatar", event.avatar());

                mongoTemplate.updateMulti(query, update, collection);
                log.info("Updated user profile info in mongodb for userId {}", event.id());
            }

            long endTime = System.currentTimeMillis();
            log.info("Consumed event from topic {} in {} ms", KafkaTopic.USER_PROFILE_EDIT_TOPIC, endTime - startTime);
        } catch (Exception e) {
            log.error("An error occurred while consuming event from topic {}: {}",
                    KafkaTopic.USER_PROFILE_EDIT_TOPIC, e.getMessage(), e);
            throw new RuntimeException("Retryable error", e);
        }
    }
}

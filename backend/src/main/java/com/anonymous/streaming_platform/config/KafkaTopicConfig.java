package com.anonymous.streaming_platform.config;

import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic userProfileUpdateTopic() {
        return TopicBuilder.name(KafkaTopic.USER_PROFILE_EDIT_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }


    @Bean
    public NewTopic userProfileUpdateDlqTopic() {
        return TopicBuilder.name(KafkaTopic.USER_PROFILE_EDIT_DLQ_TOPIC)
                .partitions(3)
                .replicas(1)
                .build();
    }
}

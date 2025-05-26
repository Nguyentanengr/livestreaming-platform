package com.anonymous.streaming_platform.service.kafkaMessenger;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String topic, Object message) {
        kafkaTemplate.send(topic, message);
    }
}

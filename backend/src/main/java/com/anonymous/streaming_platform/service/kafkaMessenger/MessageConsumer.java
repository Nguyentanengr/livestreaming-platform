package com.anonymous.streaming_platform.service.kafkaMessenger;

import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public interface MessageConsumer <T>{

    void consume(T event);

}

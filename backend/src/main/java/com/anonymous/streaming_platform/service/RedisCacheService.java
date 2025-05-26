package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

/*
    - Class hỗ trợ các thao tác get,set vào cache cụ thể cho Redis
    - Tạo cache chung cho tất cả service sử dụng nó.
*/

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisCacheService implements CacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @Override
    public <T> void set(String key, T value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public <T> void set(String key, T value, long timeout, TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    @Override
    public <T> Optional<T> get(String key, Class<T> type) {
        Object value = redisTemplate.opsForValue().get(key);
        if (value == null) {
            return Optional.empty();
        }
        try {
            T result = objectMapper.convertValue(value, type);
            log.info("Result from redis: {}", result);
            return Optional.of(result);
        } catch (IllegalArgumentException e) {
            log.error("Error while deserializing json from redis");
            return Optional.empty();
        }
    }

    @Override
    public void delete(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public boolean containsKey(String key) {
        return redisTemplate.hasKey(key);
    }
}

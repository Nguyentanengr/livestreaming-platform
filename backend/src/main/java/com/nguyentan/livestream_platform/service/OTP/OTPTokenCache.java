package com.nguyentan.livestream_platform.service.OTP;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OTPTokenCache {

    private final RedisTemplate<String, String> redisTemplate;

    public Optional<String> getTokenById(String identity) {
         return Optional.ofNullable(redisTemplate.opsForValue().get(identity));
    }

    public void cachingToken(String identity, String token, long seconds) {
        redisTemplate.opsForValue().set(identity, token, seconds, TimeUnit.SECONDS);
    }

    public void removeById(String key) {
        redisTemplate.delete(key);
    }

    public Map<String, Object> getAllItem() {
        Map<String, Object> allValues = new HashMap<>();
        try {
            Set<String> keys = redisTemplate.keys("*"); // Lấy tất cả keys trong Redis
            if (keys != null) {
                for (String key : keys) {
                    Object value = redisTemplate.opsForValue().get(key);
                    allValues.put(key, value);
                }
            }
        } catch (Exception e) {
            log.info("An Error occurred when get all item from redis: " + e.getMessage());
        }
        return allValues;
    }
}

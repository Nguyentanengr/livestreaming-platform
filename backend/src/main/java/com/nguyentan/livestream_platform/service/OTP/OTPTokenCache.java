package com.nguyentan.livestream_platform.service.OTP;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

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
}

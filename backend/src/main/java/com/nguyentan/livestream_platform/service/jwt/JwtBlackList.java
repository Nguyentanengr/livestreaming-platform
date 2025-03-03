package com.nguyentan.livestream_platform.service.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.TemporalField;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Component
public class JwtBlackList {

    private final RedisTemplate<String, Date> cache;

    public JwtBlackList(@Qualifier("JwtBlackListRedis") RedisTemplate<String, Date> redisTemplate) {
        this.cache = redisTemplate;
    }

    public Optional<Date> getExpirationTimeById(String identity) {
        return Optional.ofNullable(cache.opsForValue().get(identity));
    }

    public void cacheItem(String identity, Date expirationTime) {
        long timeToLive = Math.max(0, expirationTime.getTime() - System.currentTimeMillis());
        cache.opsForValue().set(identity, expirationTime, timeToLive, TimeUnit.MILLISECONDS);
    }

    public void removeById(String identity) {
        cache.delete(identity);
    }

    public boolean isExist(String identity) {
        return getExpirationTimeById(identity).isPresent();
    }

}

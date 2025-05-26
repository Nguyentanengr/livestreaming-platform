package com.anonymous.streaming_platform.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/*
    - Class này bọc toàn bộ thao tác với cache (cache jwt token vào blacklist),
    - chứa các phương phức blacklist token, get time to live, is blacklist
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtBlacklistService {

    private static final String JWT_BLACKLIST_PREFIX = "blacklist:";
    private final CacheService cacheService;

    public void addTokenToBlacklist(String jti, Date expirationTime) {

        String key = JWT_BLACKLIST_PREFIX + jti;

        long timeToLive = Math.max(0, expirationTime.getTime() - System.currentTimeMillis());
        cacheService.set(key, expirationTime, timeToLive , TimeUnit.MILLISECONDS);

        log.info("Added jwt id {} to blacklist.", jti);
    }

    public boolean isTokenInBlacklist(String jti) {
        String key = JWT_BLACKLIST_PREFIX + jti;
        return cacheService.containsKey(key);
    }

    public Long getTimeToLive(String jti, TimeUnit timeUnit) {
        String key = JWT_BLACKLIST_PREFIX + jti;
        Optional<Date> expirationTime = cacheService.get(key, Date.class);

        if (expirationTime.isPresent()) {
            long timeToLive = Math.max(0, expirationTime.get().getTime() - System.currentTimeMillis());
            return timeUnit.convert(timeToLive, TimeUnit.MILLISECONDS);
        }

        return 0L;
    }
}

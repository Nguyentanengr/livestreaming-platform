package com.anonymous.streaming_platform.service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

public interface CacheService {

    <T> void set(String key, T value);

    <T> void set(String key, T value, long timeout, TimeUnit timeUnit);

    <T> Optional<T> get(String key, Class<T> type);

    void delete(String key);

    boolean containsKey(String key);
}

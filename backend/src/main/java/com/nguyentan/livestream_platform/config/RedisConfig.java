package com.nguyentan.livestream_platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Date;

@Configuration
public class RedisConfig {

    @Bean
    public LettuceConnectionFactory lettuceConnection() {
        RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
        configuration.setHostName("localhost");
        configuration.setPort(6379);
        configuration.setUsername("");
        configuration.setPassword("");

        return new LettuceConnectionFactory();
    }

    @Bean
    RedisTemplate<String, String> OTPTokenCacheRedis(LettuceConnectionFactory redisConnection) {
        RedisTemplate<String, String> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnection);
        return template;
    }

    @Bean
    RedisTemplate<String, Date> JwtBlackListRedis(LettuceConnectionFactory redisConnection) {
        RedisTemplate<String, Date> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnection);
        return template;
    }



}

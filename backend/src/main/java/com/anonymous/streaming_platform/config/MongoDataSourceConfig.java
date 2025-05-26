package com.anonymous.streaming_platform.config;


import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableMongoRepositories(basePackages = "com.anonymous.streaming_platform.repository.mongodb")
public class MongoDataSourceConfig {

    @Value( "${spring.data.mongodb.uri}")
    private String MONGO_URI;

    @Value( "${spring.data.mongodb.database}")
    private String MONGO_DB_NAME;

    @Bean
    public MongoClient mongoClient() {
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(MONGO_URI))
                .applyToConnectionPoolSettings(builder -> builder
                        .maxSize(20)
                        .minSize(5)
                        .maxWaitTime(3000, TimeUnit.MILLISECONDS)
                ).retryWrites(true) // Bật retry khi write thất bại
                .build();

        return MongoClients.create(settings);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), MONGO_DB_NAME);
    }
}

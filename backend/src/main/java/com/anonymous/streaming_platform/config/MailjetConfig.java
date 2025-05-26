package com.anonymous.streaming_platform.config;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailjetConfig {

    @Value("${mailjet.api.key}")
    private String mailApiKey;

    @Value("${mailjet.api.secret}")
    private String mailApiSecret;

    @Bean
    public MailjetClient mailjetClient() {
        ClientOptions options = ClientOptions.builder()
                .apiKey(mailApiKey)
                .apiSecretKey(mailApiSecret)
                .build();
        return new MailjetClient(options);
    }
}

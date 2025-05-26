package com.anonymous.streaming_platform.controller.websocket;


import com.anonymous.streaming_platform.dto.request.ChatCreationRequest;
import com.anonymous.streaming_platform.entity.mongodb.Chat;
import com.anonymous.streaming_platform.service.ChatService;
import com.anonymous.streaming_platform.service.WsChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WsChatController {

    private final WsChatService wsChatService;

    @MessageMapping("/chat/message")
    public void chatMessage(ChatCreationRequest request, Authentication authentication) {

        log.info("Receive request for create chat {} from user {}", request, authentication != null ? authentication.getName() : "null");
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            Long userId = (Long) jwt.getClaims().get("user_id");
            log.info("User id from jwt {}", userId);

            log.info("Receive request for create chat {}", request);
            wsChatService.createChat(request, userId);
        }
    }
}

package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.NotificationResponse;
import com.anonymous.streaming_platform.mapper.NotificationMapper;
import com.anonymous.streaming_platform.repository.mongodb.NotificationRepository;
import com.anonymous.streaming_platform.service.JwtTokenGenerator;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebsocketAuthController {

    private final JwtTokenGenerator jwtTokenGenerator;


    @MessageMapping("/authenticate")
    public void authenticate(@Header("Authorization") String token, SimpMessageHeaderAccessor headerAccessor) {
        if (token != null && token.startsWith("Bearer ")) {
            log.info("Receive TOKEN {}", token);
            String jwt = token.substring(7);
            log.info("Received authentication request for jwt: {}", jwt);
            JWTClaimsSet claimsSet = jwtTokenGenerator.verifyToken(jwt);
            headerAccessor.setUser(new UsernamePasswordAuthenticationToken(claimsSet.getSubject(), null));
            log.info("Authenticated user {} for WebSocket session", claimsSet.getSubject());
            log.error("Missing user_id claim in JWT");


        } else {
            log.error("Missing or invalid Authorization header: {}", token);
        }
    }

}

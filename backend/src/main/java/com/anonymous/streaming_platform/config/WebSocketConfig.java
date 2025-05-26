package com.anonymous.streaming_platform.config;


import com.anonymous.streaming_platform.constant.RtcAction;
import com.anonymous.streaming_platform.dto.event.RtcTransportEvent;
import com.anonymous.streaming_platform.dto.request.ChatCreationRequest;
import com.anonymous.streaming_platform.dto.response.ChatCreationResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ErrorResponse;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

import java.util.List;



@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtDecoder jwtDecoder;
    public WebSocketConfig(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                try {
                    StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                    if (StompCommand.SEND.equals(accessor.getCommand()) && accessor.getDestination() != null
                            && accessor.getDestination().startsWith("/app/chat/message")) {
                        List<String> authHeaders = accessor.getNativeHeader("Authorization");
                        if (authHeaders != null && !authHeaders.isEmpty()) {
                            String token = authHeaders.get(0).replace("Bearer ", "");
                            try {
                                log.info("Starting decode jwt token: {}", token);
                                Jwt jwt = jwtDecoder.decode(token);
                                Authentication authentication = new JwtAuthenticationToken(jwt);
                                accessor.setUser(authentication); // Gắn authentication vào STOMP message
                                log.info("Decode jwt token successfully");
                            } catch (Exception e) {
                                throw new SecurityException("Invalid JWT token");
                            }
                        } else {
                            throw new SecurityException("Missing Authorization header");
                        }
                    }
                } catch (SecurityException e){
                    log.warn("Unauthorized access to chat creation endpoint: {}", e.getMessage());
                }
                return message;
            }
        });
    }

}

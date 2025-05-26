package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.dto.request.ChatCreationRequest;
import com.anonymous.streaming_platform.dto.response.ChatCreationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WsChatService {

    private final ChatService chatService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void createChat(ChatCreationRequest request, Long userId) {

        ChatCreationResponse response = chatService.createChat(request, userId);

        // Gửi response này cho tất cả moi người trong streamId
        log.info("Send chat message for all everyone in streamId: {}", request.streamId());
        sendChatMessage("/topic/chat/" + request.streamId(), response);
    }

    private synchronized void sendChatMessage(String destination, ChatCreationResponse response) {
        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend(destination, response);
        }
    }
}

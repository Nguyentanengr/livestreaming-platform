package com.nguyentan.livestream_platform.service.other;

import com.nguyentan.livestream_platform.dto.other.ChatRequestDTO;
import com.nguyentan.livestream_platform.dto.other.ChatResponseDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class ChatService {

    public List<ChatResponseDTO> chats = new ArrayList<>();

    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public void chatMessage(ChatRequestDTO request) {
        log.info("{}-{} receive message from client: {}", request.getLiveSessionId()
                , request.getUsername(), request.getContent());

        // Save chat into database
        ChatResponseDTO response = new
                ChatResponseDTO(chats.size() + 1L, request.getUsername(), request.getContent());

        chats.add(response);

        // Send all user in liveSession

        log.info("{}-{} send message to other client: {}", request.getLiveSessionId()
                , request.getUsername(), response);
        sendMessage("/topic/chat/" + request.getLiveSessionId(), response);
    }

    private synchronized void sendMessage(String destination , ChatResponseDTO response) {
        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend(destination , response);
        }
    }
}

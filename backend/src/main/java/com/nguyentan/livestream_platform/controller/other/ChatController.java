package com.nguyentan.livestream_platform.controller.other;

import com.nguyentan.livestream_platform.dto.other.ChatRequestDTO;
import com.nguyentan.livestream_platform.service.other.ChatService;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat/message")
    public void chatMessage(ChatRequestDTO request) {
        chatService.chatMessage(request);
    }
}

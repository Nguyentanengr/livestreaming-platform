package com.nguyentan.livestream_platform.controller;

import com.nguyentan.livestream_platform.dto.ChatRequestDTO;
import com.nguyentan.livestream_platform.service.ChatService;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

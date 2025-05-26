package com.anonymous.streaming_platform.controller;

import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(ChatController.CHAT_URL)
@RequiredArgsConstructor
public class ChatController {

    public static final String CHAT_URL = "api/v1/chats";
    private final ChatService chatService;

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteChat(@PathVariable("id") String id) {
        log.info("Received request to delete chat with id {}.", id);
        chatService.deleteChat(id);
        return ApiResponse.getSuccessResponse(null);
    }
}

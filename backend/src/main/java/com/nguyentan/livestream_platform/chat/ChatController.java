//package com.nguyentan.livestream_platform.chat;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.stereotype.Controller;
//
//@Log4j2
//@Controller
//@RequiredArgsConstructor
//public class ChatController {
//
//    private final ChatService chatService;
//
//    @MessageMapping("/chat/send")
//    public void sendMessage(@Payload ChatMessage chatMessage) {
//        chatService.broadcastMessage("/topic/messages", chatMessage);
//    }
//}

//package com.nguyentan.livestream_platform.chat;
//
//import lombok.AllArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class ChatService {
//
//    private final SimpMessagingTemplate messagingTemplate;
//
//    public void broadcastMessage(String destination, ChatMessage chatMessage) {
//        messagingTemplate.convertAndSend(destination, chatMessage);
//    }
//}

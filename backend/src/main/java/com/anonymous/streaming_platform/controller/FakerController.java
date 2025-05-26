package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.entity.mongodb.*;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.repository.mongodb.ActivityFeedRepository;
import com.anonymous.streaming_platform.repository.mongodb.ChatRepository;
import com.anonymous.streaming_platform.repository.mongodb.CommentRepository;
import com.anonymous.streaming_platform.repository.mongodb.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(FakerController.FAKE_URL)
@RequiredArgsConstructor
public class FakerController {

    public static final String FAKE_URL = "api/v1/fake";

    private final ChatRepository chatRepository;
    private final CommentRepository commentRepository;
    private final NotificationRepository notificationRepository;
    private final ActivityFeedRepository activityFeedRepository;
    private final PasswordEncoder passwordEncoder;

    private final RestTemplate restTemplate;

    @Value("${google.gemini.api.key}")
    private String apiKey;

    @Value("${google.gemini.api.url}")
    private String apiUrl;

    @PostMapping("/chats")
    public ApiResponse<Void> fakeChat() {

        Chat chat = Chat.builder()
                .content("Hello, I'm a fake chat.")
                .streamId("a4j#-sMds-dk2l")
                .createdAt(LocalDateTime.now())
                .user(RelatedUser.builder()
                        .id(1L)
                        .username("ThuongCuteNe")
                        .avatar("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/avatar_1I0Q9BaK_96n4W2%24m_fGcJSVqF.jpeg")
                        .build())
                .build();

        chatRepository.save(chat);
        return ApiResponse.getSuccessResponse(null);
    }


    @PostMapping("/comments")
    public ApiResponse<Void> fakeComment() {

        Comment comment = Comment.builder()
                .content("Hello, I'm a fake comment.")
                .likesCount(0)
                .reelId("kdkse-dfdsf-sdfd")
                .createdAt(LocalDateTime.now())
                .user(RelatedUser.builder()
                        .id(2L)
                        .username("ThuongCuteNe")
                        .avatar("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/avatar_1I0Q9BaK_96n4W2%24m_fGcJSVqF.jpeg")
                        .build())
                .build();

        commentRepository.save(comment);
        return ApiResponse.getSuccessResponse(null);
    }

    @PostMapping("/notifications")
    public ApiResponse<Void> fakeNotification() {

        Notification notification = Notification.builder()
                .createdAt(LocalDateTime.now())
                .receiverId(1L)
                .isRead(false)
                .type("SYSTEM")
                .build();

        Notification notification1 = Notification.builder()
                .createdAt(LocalDateTime.now())
                .receiverId(1L)
                .isRead(false)
                .type("FOLLOW")
                .user(RelatedUser.builder()
                        .id(2L)
                        .username("Hay Khi Doi Day")
                        .avatar("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/defaults/default-avatar.jpg")
                        .build())
                .build();

        Notification notification2 = Notification.builder()
                .createdAt(LocalDateTime.now())
                .receiverId(1L)
                .isRead(false)
                .type("LIKE_COMMENT")
                .user(RelatedUser.builder()
                        .id(2L)
                        .username("Hay Khi Doi Day")
                        .avatar("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/defaults/default-avatar.jpg")
                        .build())
                .reel(RelatedReel.builder()
                        .id("uKzS-2o2X-TDt8")
                        .description("Cuoc chien sinh ton trong the ky tuong lai")
                        .thumbnail("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/thumbnail_P9gM8qp1_gOoFgp%23a_MVZ7AKSi.jpeg")
                        .build())
                .build();

        notificationRepository.saveAll(List.of(notification, notification1, notification2));
        return ApiResponse.getSuccessResponse(null);
    }

    @PostMapping("/activity-feeds")
    public ApiResponse<Void> fakeActivityFeed() {

        ActivityFeed activityFeed = ActivityFeed.builder()
                .content("Hello, I'm a fake notification.")
                .createdAt(LocalDateTime.now())
                .streamId("kdkse-dfdsf-sdfs")
                .type("follow")
                .user(RelatedUser.builder()
                        .id(2L)
                        .username("ThuongCuteNe")
                        .avatar("https://jaxi-metadata-storage.s3.ap-southeast-1.amazonaws.com/avatar_1I0Q9BaK_96n4W2%24m_fGcJSVqF.jpeg")
                        .build())
                .build();

        activityFeedRepository.save(activityFeed);
        return ApiResponse.getSuccessResponse(null);
    }


    @PostMapping("/prompt")
    public String generateContent(@RequestBody  String prompt) {
        // Tạo header
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        // Tạo body yêu cầu
        String requestBody = String.format(
                "{\"contents\": [{\"parts\": [{\"text\": \"%s\"}]}]}", prompt
        );

        // Tạo entity với header và body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        // Gửi yêu cầu đến Gemini API
        String urlWithKey = apiUrl + "?key=" + apiKey;
        ResponseEntity<String> response = restTemplate.exchange(
                urlWithKey, HttpMethod.POST, entity, String.class
        );

        return response.getBody();
    }

    @GetMapping("/hash")
    public String generateHash(@RequestBody String password) {
        log.info("Received request to generate hash for password {}.", password);
        return passwordEncoder.encode(password);
    }

}

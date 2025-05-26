package com.anonymous.streaming_platform.controller;

import com.anonymous.streaming_platform.dto.request.NotificationReadRequest;
import com.anonymous.streaming_platform.dto.response.NotificationCountResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.dto.response.ListNotificationResponse;
import com.anonymous.streaming_platform.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(NotificationController.NOTIFICATION_URL)
@RequiredArgsConstructor
public class NotificationController {

    public static final String NOTIFICATION_URL = "api/v1/notifications";

    private final NotificationService notificationService;


    @GetMapping()
    public ApiResponse<ListNotificationResponse> retrieveNotifications(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        log.info("Received request to retrieve notifications.");

        var normalPage = Math.max(page, 0);
        var normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        var response = notificationService.retrieveNotifications(pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @PostMapping("/read")
    public ApiResponse<Void> markAsRead(
            @RequestBody NotificationReadRequest request
    ) {
        log.info("Received request to mark notifications as read.");

        notificationService.markAsRead(request);
        return ApiResponse.getSuccessResponse(null);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteNotification(
            @PathVariable("id") String id
    ) {
        log.info("Received request to delete notification.");

        notificationService.delete(id);
        return ApiResponse.getSuccessResponse(null);
    }

    @GetMapping("/unread")
    public ApiResponse<NotificationCountResponse> retrieveUnreadCount() {

        log.info("Received request to retrieve unread notification count.");
        var response = notificationService.retrieveUnreadCount();
        return ApiResponse.getSuccessResponse(response);
    }

    @PostMapping("/read/all")
    public ApiResponse<Void> markAllAsRead() {

        log.info("Received request to mark all notifications as read.");
        notificationService.markAllAsRead();
        return ApiResponse.getSuccessResponse(null);
    }
}

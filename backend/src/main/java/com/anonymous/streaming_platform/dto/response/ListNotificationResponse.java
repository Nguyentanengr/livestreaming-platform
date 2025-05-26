package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListNotificationResponse (

        List<NotificationResponse> notifications,
        Integer currentPage,
        Integer totalPages

) {}

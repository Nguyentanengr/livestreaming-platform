package com.anonymous.streaming_platform.dto.request;

import lombok.Builder;

import java.util.List;

public record NotificationReadRequest(

        List<String> notificationIds
) {
}

package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record NotificationCountResponse (
        Integer unreadCount
) {
}

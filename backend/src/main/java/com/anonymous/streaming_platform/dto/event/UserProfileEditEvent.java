package com.anonymous.streaming_platform.dto.event;

import lombok.Builder;

@Builder
public record UserProfileEditEvent (
        Long id,
        String username,
        String avatar
) {
}

package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record UserStreamResponse (
        Long id,
        String username,
        String avatar,
        Boolean isFollowing,
        Boolean isStreaming
) {
}

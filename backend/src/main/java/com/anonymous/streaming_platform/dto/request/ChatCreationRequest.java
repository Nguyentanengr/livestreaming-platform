package com.anonymous.streaming_platform.dto.request;

import lombok.Builder;

@Builder
public record ChatCreationRequest(
        String streamId,
        String userSessionId,
        String content
) {
}

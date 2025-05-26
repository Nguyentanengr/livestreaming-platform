package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record LinkResponse(
        String youtube,
        String tiktok,
        String discord
) {
}

package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record CategoryRcmResponse(
        Long id,
        String name,
        String thumbnail,
        String description,
        Integer interestedCount,
        Boolean isInterested

) {
}

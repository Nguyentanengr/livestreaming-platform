package com.anonymous.streaming_platform.dto.response;

import com.anonymous.streaming_platform.dto.response.wrapper.ErrorResponse;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ChatCreationResponse(
        String id,
        String content,
        LocalDateTime createdAt,
        RelatedUser user
) {
}

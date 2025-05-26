package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentCreationResponse(
        String id,
        String reelId,
        String content,
        Integer likesCount,
        LocalDateTime createdAt,
        LocalDateTime deletedAt,
        UserSummaryResponse user
) {
}

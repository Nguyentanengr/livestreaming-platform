package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CommentBasicResponse(
        String id,
        String reelId,
        String content,
        Integer likesCount,
        Boolean isLiked,
        LocalDateTime createdAt,
        UserSummaryResponse user
) {
}

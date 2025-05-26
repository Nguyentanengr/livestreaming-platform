package com.anonymous.streaming_platform.dto.response;

import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NotificationResponse(

        String id,
        String type,
        String content,
        Boolean isRead,
        LocalDateTime createdAt,
        LocalDateTime deletedAt,
        Long receiverId,
        Integer milestone,
        RelatedUser user,
        RelatedReel reel
) {
}

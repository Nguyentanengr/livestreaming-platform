package com.anonymous.streaming_platform.dto.request;

import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import lombok.Builder;

@Builder
public record NotificationCreateRequest(
        Long receiverId,
        RelatedUser user,
        RelatedReel reel,
        NotiType type,
        Integer milestone
) {
}

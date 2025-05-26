package com.anonymous.streaming_platform.dto.event;

import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import lombok.Builder;

@Builder
public record NotificationEvent(

        NotiType type,
        Long receiverId,
        RelatedUser user,
        RelatedReel reel

) {
}

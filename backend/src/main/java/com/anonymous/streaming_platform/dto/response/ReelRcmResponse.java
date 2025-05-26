package com.anonymous.streaming_platform.dto.response;

import com.anonymous.streaming_platform.constant.Visibility;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record ReelRcmResponse (

        String id,
        String description,
        String thumbnail,
        String video,
        Integer likesCount,
        Integer commentsCount,
        Integer viewsCount,
        LocalDateTime createdAt,
        Boolean isLiked,
        List<String> tagNames,
        UserThumbnailResponse user

) {
}

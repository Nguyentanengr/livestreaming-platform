package com.anonymous.streaming_platform.dto.response;

import com.anonymous.streaming_platform.constant.Visibility;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record StreamResponse (

        String id,
        String title,
        String liveNotification,
        String video,
        String thumbnail,
        Integer peakViewers,
        Integer viewersCount,
        Integer totalViewers,
        Visibility visibility,
        Boolean commentEnabled,
        LocalDateTime startedAt,
        LocalDateTime endedAt,
        LocalDateTime deletedAt,
        CategoryResponse category,
        UserStreamResponse user,
        List<String>tagNames

) {
}

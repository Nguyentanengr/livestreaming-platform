package com.anonymous.streaming_platform.dto.response;


import com.anonymous.streaming_platform.constant.Visibility;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record StreamRcmResponse(

        String id,
        String title,
        String liveNotification,
        String thumbnail,
        String video,
        Integer peakViewers,
        Integer viewersCount,
        Integer totalViewers,
        Visibility visibility,
        Boolean commentEnabled,
        LocalDateTime startedAt,
        LocalDateTime endedAt,
        List<String> tagNames,
        CategoryResponse category,
        UserStreamResponse user
) {}

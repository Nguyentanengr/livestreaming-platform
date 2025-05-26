package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record UserThumbnailResponse (
        Long id,
        String username,
        String avatar,
        Boolean isFollowing

) {}

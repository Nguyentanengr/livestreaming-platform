package com.anonymous.streaming_platform.dto.response;


import lombok.Builder;

@Builder
public record FollowedUserResponse(
        Long id,
        String username,
        Integer followersCount,
        String avatar,
        Boolean isFollowing,
        Boolean isStreaming
) {
}

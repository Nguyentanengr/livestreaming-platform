package com.anonymous.streaming_platform.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

@Builder
public record UserProfileResponse(
        Long id,
        String username,
        String avatar,
        String bio,
        Integer followersCount,
        Integer streamsCount,
        Integer reelsCount,
        Boolean isStreaming,
        Boolean isFollowing,
        LinkResponse link
) {

    // Clone đối tượng cũ với isFollowing
    public UserProfileResponse withIsFollowing(Boolean isFollowing) {
        return new UserProfileResponse(
                this.id(), this.username(), this.avatar(), this.bio(),
                this.followersCount(), this.streamsCount(), this.reelsCount(),
                this.isStreaming(), isFollowing, this.link()
        );
    }
}

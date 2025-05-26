package com.anonymous.streaming_platform.dto.response;


import lombok.Builder;

import java.util.List;

@Builder
public record ListFollowedUserResponse(

        List<FollowedUserResponse> users,
        Integer currentPage,
        Integer totalPages
) {
}

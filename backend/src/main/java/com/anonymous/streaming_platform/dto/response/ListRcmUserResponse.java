package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListRcmUserResponse(

        List<RcmUserResponse> users,
        Integer currentPage,
        Integer totalPages
) {
}
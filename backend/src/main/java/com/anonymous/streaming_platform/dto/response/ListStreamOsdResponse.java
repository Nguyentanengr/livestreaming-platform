package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListStreamOsdResponse (

        List<StreamOsdResponse> streams,
        Integer currentPage,
        Integer totalPages
) {
}

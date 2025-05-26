package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListStreamRcmResponse(

        List<StreamRcmResponse> streams,
        Integer currentPage,
        Integer totalPages
) {
}

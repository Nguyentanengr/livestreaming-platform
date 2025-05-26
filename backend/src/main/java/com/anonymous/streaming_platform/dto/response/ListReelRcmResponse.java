package com.anonymous.streaming_platform.dto.response;


import lombok.Builder;

import java.util.List;

@Builder
public record ListReelRcmResponse (
        List<ReelRcmResponse> reels,
        Integer currentPage,
        Integer totalPages
) {
}

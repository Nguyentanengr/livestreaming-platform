package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListCategoryRcmResponse(
        List<CategoryRcmResponse> categories,
        Integer currentPage,
        Integer totalPages
) {}

package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ListCategoryResponse (
        List<CategoryResponse> categories,
        Integer currentPage,
        Integer totalPages
) {}

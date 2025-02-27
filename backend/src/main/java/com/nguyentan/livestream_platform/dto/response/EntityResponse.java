package com.nguyentan.livestream_platform.dto.response;

import lombok.Builder;


@Builder
public record EntityResponse<T>(
        Long code,
        String message,
        T value
) {}

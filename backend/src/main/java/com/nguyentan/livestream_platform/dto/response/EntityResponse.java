package com.nguyentan.livestream_platform.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;


@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record EntityResponse<T>(
        Long code,
        String message,
        T value
) {}

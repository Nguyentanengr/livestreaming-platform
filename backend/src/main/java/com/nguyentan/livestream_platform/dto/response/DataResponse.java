package com.nguyentan.livestream_platform.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.time.LocalDateTime;


@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record DataResponse<T>(
        Long code,
        String message,
        T data
) {}

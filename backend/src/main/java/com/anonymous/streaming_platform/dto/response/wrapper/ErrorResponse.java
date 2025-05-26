package com.anonymous.streaming_platform.dto.response.wrapper;

import com.anonymous.streaming_platform.exception.error.Error;
import lombok.Builder;

@Builder
public record ErrorResponse (
        String code,
        String message
) {

    public static ErrorResponse get(Error error) {
        return new ErrorResponse(error.getCode(), error.getMessage());
    }
}

package com.anonymous.streaming_platform.dto.response.wrapper;
import lombok.*;

import java.time.LocalDateTime;

@Builder
public record ApiResponse<T> (
        String status,
        T data,
        ErrorResponse error,
        LocalDateTime timestamp
) {
    public static <T> ApiResponse<T> getSuccessResponse(T data) {
        return new ApiResponse<>("success", data, null, LocalDateTime.now());
    }

    public static <T> ApiResponse<T> getErrorResponse(ErrorResponse error) {
        return new ApiResponse<>("error", null, error, LocalDateTime.now());
    }
}

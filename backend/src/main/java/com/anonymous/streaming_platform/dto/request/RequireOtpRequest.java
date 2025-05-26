package com.anonymous.streaming_platform.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record RequireOtpRequest (

        @NotBlank(message = "EMAIL_BLANK")
        @NotNull(message = "EMAIL_BLANK")
        @Size(min = 8, max = 50, message = "EMAIL_INVALID_SIZE")
        @Email(message = "EMAIL_INVALID_FORMAT")
        String email

) {
}

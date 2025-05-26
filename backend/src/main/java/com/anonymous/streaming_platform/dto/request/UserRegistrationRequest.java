package com.anonymous.streaming_platform.dto.request;

import com.anonymous.streaming_platform.validator.StrongPassword;
import jakarta.validation.constraints.*;
import lombok.Builder;

@Builder
public record UserRegistrationRequest(

        @NotBlank(message = "OTP_BLANK")
        @NotNull(message = "OTP_BLANK")
        @Size(min = 6, max = 6, message = "OTP_INVALID_SIZE")
        @Pattern(regexp = "\\d+", message = "OTP_MUST_BE_NUMERIC")
        String code,

        @NotBlank(message = "EMAIL_BLANK")
        @NotNull(message = "EMAIL_BLANK")
        @Size(min = 8, max = 50, message = "EMAIL_INVALID_SIZE")
        @Email(message = "EMAIL_INVALID_FORMAT")
        String email,

        @StrongPassword(message = "PASSWORD_IS_WEAK")
        @NotBlank(message = "PASSWORD_BLANK")
        @NotNull(message = "PASSWORD_BLANK")
        @Size(min = 8, max = 255, message = "PASSWORD_INVALID_SIZE")
        String password
) {}

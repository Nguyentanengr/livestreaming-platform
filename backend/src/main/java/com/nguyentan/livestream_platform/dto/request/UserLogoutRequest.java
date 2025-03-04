package com.nguyentan.livestream_platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record UserLogoutRequest(
        @NotBlank(message = "JWT_TOKEN_IS_BLANK")
        @NotNull(message = "JWT_TOKEN_IS_BLANK")
        String token
) {}

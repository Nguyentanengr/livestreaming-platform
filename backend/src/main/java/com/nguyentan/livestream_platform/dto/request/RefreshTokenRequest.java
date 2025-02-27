package com.nguyentan.livestream_platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RefreshTokenRequest(

        @NotBlank(message = "Token cannot be blank")
        @NotNull(message = "Token cannot be blank")
        String token
) {}

package com.nguyentan.livestream_platform.dto.request;

import com.nguyentan.livestream_platform.validator.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserAuthenticationRequest(

        @Email(message = "EMAIL_INVALID_FORMAT")
        String email,

        String password
) {}

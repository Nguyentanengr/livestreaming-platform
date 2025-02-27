package com.nguyentan.livestream_platform.dto.request;

import com.nguyentan.livestream_platform.validator.StrongPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record UserAuthenticationRequest(

        @NotBlank(message = "Email cannot be blank")
        @NotNull(message = "Email cannot be blank")
        @Size(min = 8, max = 255, message = "Email cannot be too long or too short")
        @Email(message = "Invalid email format")
        String email,

        @StrongPassword
        @NotBlank(message = "Password cannot be blank")
        @NotNull(message = "Password cannot be blank")
        @Size(min = 8, max = 255, message = "Password cannot be too long or too short")
        String password
) {}

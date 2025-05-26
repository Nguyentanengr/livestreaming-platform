package com.anonymous.streaming_platform.dto.request;

import com.anonymous.streaming_platform.validator.StrongPassword;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record ChangePasswordRequest(

        @StrongPassword(message = "PASSWORD_IS_WEAK")
        @NotBlank(message = "PASSWORD_BLANK")
        @NotNull(message = "PASSWORD_BLANK")
        @Size(min = 8, max = 255, message = "PASSWORD_INVALID_SIZE")
        String oldPassword,

        @StrongPassword(message = "PASSWORD_IS_WEAK")
        @NotBlank(message = "PASSWORD_BLANK")
        @NotNull(message = "PASSWORD_BLANK")
        @Size(min = 8, max = 255, message = "PASSWORD_INVALID_SIZE")
        String newPassword,


        @StrongPassword(message = "PASSWORD_IS_WEAK")
        @NotBlank(message = "PASSWORD_BLANK")
        @NotNull(message = "PASSWORD_BLANK")
        @Size(min = 8, max = 255, message = "PASSWORD_INVALID_SIZE")
        String confirmNewPassword
) {

    @AssertTrue(message = "PASSWORDS_NOT_MATCH")
    public boolean isPasswordsMatch() {
        return newPassword.equals(confirmNewPassword);
    }
}

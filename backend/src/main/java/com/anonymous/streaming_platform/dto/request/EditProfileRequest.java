package com.anonymous.streaming_platform.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record EditProfileRequest (

        @NotNull(message = "USERNAME_BLANK")
        @NotEmpty(message = "USERNAME_BLANK")
        @Size(min = 4, max = 20, message = "USERNAME_INVALID_SIZE")
        String username,

        @Size(max = 2000, message = "BIO_INVALID_SIZE")
        String bio,

        @NotNull(message = "LINK_BLANK")
        LinkRequest link
) {
}

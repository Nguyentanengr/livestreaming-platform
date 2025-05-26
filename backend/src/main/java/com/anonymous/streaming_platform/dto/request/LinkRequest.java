package com.anonymous.streaming_platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LinkRequest(

        @Size(max = 255, message = "LINK_INVALID_SIZE")
        String youtube,

        @Size(max = 255, message = "LINK_INVALID_SIZE")
        String tiktok,

        @Size(max = 255, message = "LINK_INVALID_SIZE")
        String discord
) {
}

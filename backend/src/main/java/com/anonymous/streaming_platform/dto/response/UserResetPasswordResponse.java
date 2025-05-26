package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;
import org.json.JSONPropertyIgnore;

@Builder
public record UserResetPasswordResponse (
        String accessToken,

        @JSONPropertyIgnore
        String refreshToken,

        UserSummaryResponse user
) {
}

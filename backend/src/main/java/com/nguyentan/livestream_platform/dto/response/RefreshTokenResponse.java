package com.nguyentan.livestream_platform.dto.response;

import lombok.Builder;
import org.json.JSONPropertyIgnore;

@Builder
public record RefreshTokenResponse(
        String accessToken,

        @JSONPropertyIgnore
        String refreshToken
) {}

package com.nguyentan.livestream_platform.dto.response;

import lombok.Builder;

@Builder
public record UserAuthenticationResponse(
        Boolean isAuthenticated,
        String accessToken,
        String refreshToken
) {}

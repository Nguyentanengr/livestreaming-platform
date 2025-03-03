package com.nguyentan.livestream_platform.dto.response;

import lombok.Builder;

@Builder
public record UserResetPasswordResponse (String accessToken, String refreshToken) { }

package com.nguyentan.livestream_platform.controller.auth;
import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.EntityResponse;
import com.nguyentan.livestream_platform.dto.response.RefreshTokenResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;

public interface AuthBase {

    EntityResponse<Void> requireRegistrationOTP(RequireOTPRequest request);

    EntityResponse<Void> register(UserRegistrationRequest request);

    EntityResponse<Void> resetPassword(ResetPasswordRequest request);

    EntityResponse<UserAuthenticationResponse> authenticate(UserAuthenticationRequest request);

    EntityResponse<RefreshTokenResponse> refreshToken(RefreshTokenRequest request);

    EntityResponse<Void> logout(LogoutRequest request);
}

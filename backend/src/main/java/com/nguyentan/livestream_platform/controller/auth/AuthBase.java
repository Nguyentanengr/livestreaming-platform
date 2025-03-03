package com.nguyentan.livestream_platform.controller.auth;
import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.*;

public interface AuthBase {

    EntityResponse<Void> requireRegistrationOTP(RequireOTPRequest request);

    EntityResponse<UserRegistrationResponse> register(UserRegistrationRequest request);

    EntityResponse<UserResetPasswordResponse> resetPassword(UserResetPasswordRequest request);

    EntityResponse<UserAuthenticationResponse> authenticate(UserAuthenticationRequest request);

    EntityResponse<RefreshTokenResponse> refreshToken(RefreshTokenRequest request);

    EntityResponse<Void> logout(LogoutRequest request);
}

package com.nguyentan.livestream_platform.controller.auth;
import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.*;

public interface AuthBase {

    DataResponse<Void> requireRegistrationOTP(RequireOTPRequest request);

    DataResponse<Void> requireResetPasswordOTP(RequireOTPRequest request);

    DataResponse<UserRegistrationResponse> register(UserRegistrationRequest request);

    DataResponse<UserResetPasswordResponse> resetPassword(UserResetPasswordRequest request);

    DataResponse<UserAuthenticationResponse> authenticate(UserAuthenticationRequest request);

    DataResponse<RefreshTokenResponse> refreshToken(RefreshTokenRequest request);

    DataResponse<Void> logout(UserLogoutRequest request);
}

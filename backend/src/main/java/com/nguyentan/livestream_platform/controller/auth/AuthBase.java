package com.nguyentan.livestream_platform.controller.auth;

import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface AuthBase {

    DataResponse<Void> requireRegistrationOTP(RequireOTPRequest request);

    DataResponse<Void> requireResetPasswordOTP(RequireOTPRequest request);

    ResponseEntity<DataResponse<UserRegistrationResponse>> register(UserRegistrationRequest request);

    ResponseEntity<DataResponse<UserResetPasswordResponse>> resetPassword(UserResetPasswordRequest request);

    ResponseEntity<DataResponse<UserAuthenticationResponse>> authenticate(UserAuthenticationRequest request);

    ResponseEntity<DataResponse<RefreshTokenResponse>> refreshToken(HttpServletRequest request);

    DataResponse<Void> logout(HttpServletRequest request);
}

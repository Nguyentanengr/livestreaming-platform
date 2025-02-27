package com.nguyentan.livestream_platform.controller.auth;


import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.EntityResponse;
import com.nguyentan.livestream_platform.dto.response.RefreshTokenResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = UserAuthController.USER_SECURITY_API_URL)
public class UserAuthController implements AuthBase{

    public static final String USER_SECURITY_API_URL = "/api/v1/auth/";

    @Override
    public EntityResponse<Void> requireOTP(RequireOTPRequest request) {
        String email = request.email();

        // tao token


        // send email voi token do
        return null;
    }

    @Override
    public EntityResponse<Void> register(UserRegistrationRequest request) {
        return null;
    }

    @Override
    public EntityResponse<Void> resetPassword(ResetPasswordRequest request) {
        return null;
    }

    @Override
    public EntityResponse<UserAuthenticationResponse> authenticate(UserAuthenticationRequest request) {
        return null;
    }

    @Override
    public EntityResponse<RefreshTokenResponse> refreshToken(RefreshTokenRequest request) {
        return null;
    }

    @Override
    public EntityResponse<Void> logout(LogoutRequest request) {
        return null;
    }
}

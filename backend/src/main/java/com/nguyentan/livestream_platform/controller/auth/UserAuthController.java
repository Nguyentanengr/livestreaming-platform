package com.nguyentan.livestream_platform.controller.auth;

import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.EntityResponse;
import com.nguyentan.livestream_platform.dto.response.RefreshTokenResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = UserAuthController.USER_SECURITY_API_URL)
public class UserAuthController implements AuthBase{

    public static final String USER_SECURITY_API_URL = "/api/v1/auth/";

    private final EmailSender emailSender;

    @Override
    @PostMapping("/register/require-otp")
    public EntityResponse<Void> requireRegistrationOTP(@RequestBody @Valid RequireOTPRequest request) {

        
        String email = request.email();

        emailSender.sendRegistrationOTPTokenEmail(email);

        return EntityResponse.<Void>builder()
                .code(1000L)
                .message("Email has been sent")
                .build();
    }

    @Override
    @PostMapping("/register")
    public EntityResponse<Void> register(@RequestBody @Valid UserRegistrationRequest request) {
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

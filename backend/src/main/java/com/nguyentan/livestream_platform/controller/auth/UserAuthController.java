package com.nguyentan.livestream_platform.controller.auth;

import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.EntityResponse;
import com.nguyentan.livestream_platform.dto.response.RefreshTokenResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import com.nguyentan.livestream_platform.dto.response.UserRegistrationResponse;
import com.nguyentan.livestream_platform.service.OTP.OTPTokenManager;
import com.nguyentan.livestream_platform.service.auth.UserRegistrationService;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import com.nguyentan.livestream_platform.service.user.SingleUserService;
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
    private final OTPTokenManager tokenManager;

    private final SingleUserService singleUserService;
    private final UserRegistrationService userRegistrationService;

    @Override
    @PostMapping("/register/require-otp")
    public EntityResponse<Void> requireRegistrationOTP(@RequestBody @Valid RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        boolean isExistAccount = singleUserService.existUserByEmail(email);

        if (!isExistAccount) {
            emailSender.sendRegistrationOTPTokenEmail(email);
        }

        // Call OTPTokenManager to generate OTP and send mail by MailService
        return EntityResponse.<Void>builder()
                .code(isExistAccount ? 1408L : 1000L)
                .message(isExistAccount ? "Email already has an account" : "Email has been sent")
                .build();
    }

    @Override
    @PostMapping("/register")
    public EntityResponse<UserRegistrationResponse> register(@RequestBody @Valid UserRegistrationRequest request) {

        // Verify the email & validate token
        boolean isVerified = !singleUserService.existUserByEmail(request.email())
                && tokenManager.validateOTPToken(request.email(), request.code());

        return EntityResponse.<UserRegistrationResponse>builder()
                .code(isVerified ? 1000L : 1050L)
                .value(isVerified ? userRegistrationService.register(request) : null)
                .message(isVerified ? null : "OTP is invalid or expired")
                .build();
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

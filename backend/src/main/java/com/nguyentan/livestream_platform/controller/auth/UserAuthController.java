package com.nguyentan.livestream_platform.controller.auth;

import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.*;
import com.nguyentan.livestream_platform.service.OTP.OTPTokenManager;
import com.nguyentan.livestream_platform.service.auth.RefreshTokenService;
import com.nguyentan.livestream_platform.service.auth.UserAuthenticationService;
import com.nguyentan.livestream_platform.service.auth.UserRegistrationService;
import com.nguyentan.livestream_platform.service.auth.UserResetPasswordService;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import com.nguyentan.livestream_platform.service.user.SingleUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = UserAuthController.USER_SECURITY_API_URL)
public class UserAuthController implements AuthBase{

    public static final String USER_SECURITY_API_URL = "/api/v1/auth/";

    private final EmailSender emailSender;
    private final OTPTokenManager tokenManager;

    private final SingleUserService singleUserService;
    private final RefreshTokenService refreshTokenService;
    private final UserRegistrationService userRegistrationService;
    private final UserResetPasswordService userResetPasswordService;
    private final UserAuthenticationService userAuthenticationService;

    @Override
    @PostMapping("/register/require-otp")
    public EntityResponse<Void> requireRegistrationOTP(@RequestBody @Valid RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        boolean isExistAccount = singleUserService.existUserByEmail(email);

        // Call OTPTokenManager to check & generate OTP and send mail by MailService
        if (!isExistAccount) {
            emailSender.sendRegistrationOTPTokenEmail(email);
        }

        return EntityResponse.<Void>builder()
                .code(isExistAccount ? 1408L : 1000L)
                .message(isExistAccount ? "Email already has an account" : "Email has been sent")
                .build();
    }


    @PostMapping("/reset-password/require-otp")
    public EntityResponse<Void> requireResetPasswordOTP(@RequestBody @Valid RequireOTPRequest request) {

        String email = request.email();

        // Check if email already has an account
        Optional<String> nickname = singleUserService.getNicknameByEmail(email);

        // Call OTPTokenManager to check & generate OTP and send mail by MailService
        nickname.ifPresent(value -> emailSender.sendResetPasswordOTPTokenEmail(email, value));

        return EntityResponse.<Void>builder()
                .code(nickname.isEmpty() ? 1080L : 1000L)
                .message(nickname.isEmpty() ? "Email is not registered" : "Email has been sent")
                .build();
    }

    @Override
    @PostMapping("/register")
    public EntityResponse<UserRegistrationResponse> register(@RequestBody @Valid UserRegistrationRequest request) {

        // Verify the email & validate token
        boolean isVerified = tokenManager.validateOTPToken(request.email(), request.code());

        return EntityResponse.<UserRegistrationResponse>builder()
                .code(isVerified ? 1000L : 1050L)
                .value(isVerified ? userRegistrationService.register(request) : null)
                .message(isVerified ? null : "OTP is invalid or expired")
                .build();
    }


    @Override
    @PostMapping("/login")
    public EntityResponse<UserAuthenticationResponse> authenticate(@RequestBody @Valid UserAuthenticationRequest request) {
        return EntityResponse.<UserAuthenticationResponse>builder()
                .code(1000L)
                .value(userAuthenticationService.authenticate(request))
                .build();
    }

    @Override
    @PostMapping("/refresh-token")
    public EntityResponse<RefreshTokenResponse> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {
        return EntityResponse.<RefreshTokenResponse>builder()
                .code(1000L)
                .value(refreshTokenService.refreshToken(request))
                .build();
    }

    @Override
    @PostMapping("/logout")
    public EntityResponse<Void> logout(@RequestBody @Valid LogoutRequest request) {
        return EntityResponse.<Void>builder()
                .code(1000L)
                .message("Logout successfully")
                .build();
    }


    @Override
    @PostMapping("/reset-password")
    public EntityResponse<UserResetPasswordResponse> resetPassword(@RequestBody @Valid UserResetPasswordRequest request) {

        // Verify the email & validate token
        boolean isVerified = singleUserService.existUserByEmail(request.email())
                && tokenManager.validateOTPToken(request.email(), request.code());

        return EntityResponse.<UserResetPasswordResponse>builder()
                .code(isVerified ? 1000L : 1050L)
                .value(isVerified ? userResetPasswordService.resetPassword(request) : null)
                .message(isVerified ? null : "OTP is invalid or expired")
                .build();

    }

    @GetMapping("/hello")
    public EntityResponse<Void> hello() {
        return EntityResponse.<Void>builder()
                .code(1000L)
                .message("Hello, you are authenticated!")
                .build();
    }
}

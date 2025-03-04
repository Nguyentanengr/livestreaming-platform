package com.nguyentan.livestream_platform.controller.auth;

import com.nguyentan.livestream_platform.dto.request.*;
import com.nguyentan.livestream_platform.dto.response.*;
import com.nguyentan.livestream_platform.service.auth.*;
import com.nguyentan.livestream_platform.service.email.EmailSender;
import com.nguyentan.livestream_platform.service.otp.OTPTokenManager;
import com.nguyentan.livestream_platform.service.user.SingleUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = UserAuthController.USER_SECURITY_API_URL)
public class UserAuthController implements AuthBase{

    public static final String USER_SECURITY_API_URL = "/api/v1/auth/";

    private final OTPTokenManager tokenManager;
    private final SingleUserService singleUserService;
    private final UserLogoutService userLogoutService;
    private final RefreshTokenService refreshTokenService;
    private final UserRegistrationService userRegistrationService;
    private final UserResetPasswordService userResetPasswordService;
    private final UserAuthenticationService userAuthenticationService;
    private final RequireRegistrationOTPService requireRegistrationOTPService;
    private final RequireResetPasswordOTPService requireResetPasswordOTPService;

    @Override
    @PostMapping("/register/require-otp")
    public DataResponse<Void> requireRegistrationOTP(@RequestBody @Valid RequireOTPRequest request) {

        requireRegistrationOTPService.requireOTP(request);

        return DataResponse.<Void>builder()
                .code(CodeResponse.EMAIL_HAS_BEEN_SEND.getCode())
                .message(CodeResponse.EMAIL_HAS_BEEN_SEND.getMessage())
                .build();
    }


    @Override
    @PostMapping("/reset-password/require-otp")
    public DataResponse<Void> requireResetPasswordOTP(@RequestBody @Valid RequireOTPRequest request) {

        requireResetPasswordOTPService.requireOTP(request);

        return DataResponse.<Void>builder()
                .code(CodeResponse.EMAIL_HAS_BEEN_SEND.getCode())
                .message(CodeResponse.EMAIL_HAS_BEEN_SEND.getMessage())
                .build();
    }

    @Override
    @PostMapping("/register")
    public DataResponse<UserRegistrationResponse> register(@RequestBody @Valid UserRegistrationRequest request) {

        return DataResponse.<UserRegistrationResponse>builder()
                .code(CodeResponse.REGISTER_SUCCESSFULLY.getCode())
                .message(CodeResponse.REGISTER_SUCCESSFULLY.getMessage())
                .data(userRegistrationService.register(request))
                .build();
    }


    @Override
    @PostMapping("/login")
    public DataResponse<UserAuthenticationResponse> authenticate(@RequestBody @Valid UserAuthenticationRequest request) {

        UserAuthenticationResponse response = userAuthenticationService.authenticate(request);
        CodeResponse codeResponse = response.isAuthenticated()
                ? CodeResponse.LOGIN_SUCCESSFULLY
                : CodeResponse.LOGIN_FAIL;

        return DataResponse.<UserAuthenticationResponse>builder()
                .code(codeResponse.getCode())
                .message(codeResponse.getMessage())
                .data(response)
                .build();
    }

    @Override
    @PostMapping("/refresh-token")
    public DataResponse<RefreshTokenResponse> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {

        return DataResponse.<RefreshTokenResponse>builder()
                .code(CodeResponse.REFRESH_TOKEN_SUCCESSFULLY.getCode())
                .message(CodeResponse.REFRESH_TOKEN_SUCCESSFULLY.getMessage())
                .data(refreshTokenService.refreshToken(request))
                .build();
    }

    @Override
    @PostMapping("/logout")
    public DataResponse<Void> logout(@RequestBody @Valid UserLogoutRequest request) {
        userLogoutService.logout(request);
        return DataResponse.<Void>builder()
                .code(CodeResponse.LOGOUT_SUCCESSFULLY.getCode())
                .message(CodeResponse.LOGOUT_SUCCESSFULLY.getMessage())
                .build();
    }


    @Override
    @PostMapping("/reset-password")
    public DataResponse<UserResetPasswordResponse> resetPassword(@RequestBody @Valid UserResetPasswordRequest request) {

        // Verify the email & validate token
        boolean isVerified = tokenManager.validateOTPToken(request.email(), request.code());

        return DataResponse.<UserResetPasswordResponse>builder()
                .code(CodeResponse.RESET_PASSWORD_SUCCESSFULLY.getCode())
                .data(userResetPasswordService.resetPassword(request))
                .message(CodeResponse.RESET_PASSWORD_SUCCESSFULLY.getMessage())
                .build();

    }

    @GetMapping("/hello")
    public DataResponse<Void> hello() {

        if (true) throw new RuntimeException("Black");

        return DataResponse.<Void>builder()
                .code(1000L)
                .message("Hello, you are authenticated!")
                .build();
    }
}

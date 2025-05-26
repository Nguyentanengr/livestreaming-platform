package com.anonymous.streaming_platform.controller;

import com.anonymous.streaming_platform.dto.request.RequireOtpRequest;
import com.anonymous.streaming_platform.dto.request.UserAuthenticationRequest;
import com.anonymous.streaming_platform.dto.request.UserRegistrationRequest;
import com.anonymous.streaming_platform.dto.request.UserResetPasswordRequest;
import com.anonymous.streaming_platform.dto.response.RefreshTokenResponse;
import com.anonymous.streaming_platform.dto.response.UserAuthenticationResponse;
import com.anonymous.streaming_platform.dto.response.UserRegistrationResponse;
import com.anonymous.streaming_platform.dto.response.UserResetPasswordResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.service.UserAuthService;
import com.anonymous.streaming_platform.util.CookieExtractor;
import com.anonymous.streaming_platform.util.CookieHeaderBuilder;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@Slf4j
@RestController
@RequestMapping(UserAuthController.AUTH_URL)
@RequiredArgsConstructor
public class UserAuthController {

    public static final String AUTH_URL = "api/v1/auth";

    @Value("${jwt.refresh-token.duration}")
    private Integer refreshTokenDuration;

    private final CookieHeaderBuilder cookieHeaderBuilder;
    private final CookieExtractor cookieExtractor;
    private final UserAuthService userAuthService;

    @PostMapping("/send-otp/register")
    public ApiResponse<Void> requireRegistrationOtp(@RequestBody @Valid RequireOtpRequest request) {

        log.info("Received registration OTP request: {}", request);
        userAuthService.requireRegistrationOtp(request);

        log.info("Sent registration OTP successfully");
        return ApiResponse.getSuccessResponse(null);
    }

    @PostMapping("/send-otp/reset-password")
    public ApiResponse<Void> requireResetPasswordOtp(@RequestBody @Valid RequireOtpRequest request) {

        log.info("Received reset password OTP request: {}", request);
        userAuthService.requireResetPasswordOtp(request);

        log.info("Sent reset password OTP successfully");
        return ApiResponse.getSuccessResponse(null);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody @Valid UserRegistrationRequest request) {

        log.info("Received registration request: {}", request);
        UserRegistrationResponse response = userAuthService.register(request);

        log.info("Registered user with user id {} successfully.", response.user().id());
        ApiResponse<UserRegistrationResponse> apiResponse = ApiResponse.getSuccessResponse(response);

        return new ResponseEntity<>(
                apiResponse,
                cookieHeaderBuilder.build("refreshToken", response.refreshToken(), refreshTokenDuration),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> authenticate(@RequestBody @Valid UserAuthenticationRequest request) {

        log.info("Received login request: {}", request);
        UserAuthenticationResponse response = userAuthService.authenticate(request);

        log.info("Authenticated user with user id {} successfully.", response.user().id());
        ApiResponse<UserAuthenticationResponse> apiResponse = ApiResponse.getSuccessResponse(response);

        return new ResponseEntity<>(
                apiResponse,
                cookieHeaderBuilder.build("refreshToken", response.refreshToken(), refreshTokenDuration),
                HttpStatus.CREATED
        );
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<?>> refreshToken(HttpServletRequest request) {

        String refreshToken = cookieExtractor.extractFromHeader(request, "refreshToken");

        log.info("Received refresh token from refresh token request header: {}", refreshToken);

        if (Objects.isNull(refreshToken)) {
            throw new AuthenticationException(Error.REFRESH_TOKEN_NOT_PROVIDED);
        }

        RefreshTokenResponse response = userAuthService.refreshToken(refreshToken);

        log.info("Refreshed token for user {} successfully.", response.user().id());

        return new ResponseEntity<>(
                ApiResponse.getSuccessResponse(response),
                cookieHeaderBuilder.build("refreshToken", response.refreshToken(), refreshTokenDuration),
                HttpStatus.OK
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(HttpServletRequest request) {

        String refreshToken = cookieExtractor.extractFromHeader(request, "refreshToken");

        log.info("Received refresh token from logout request header: {}", refreshToken);

        if (Objects.isNull(refreshToken)) {
            throw new AuthenticationException(Error.REFRESH_TOKEN_NOT_PROVIDED);
        }

        Long userId = userAuthService.logout(refreshToken);
        log.info("Logout user with refresh token {} successfully.", userId);

        return new ResponseEntity<>(
                ApiResponse.getSuccessResponse(null),
                cookieHeaderBuilder.removeCookie("refreshToken"),
                HttpStatus.OK
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<?>> logout(@RequestBody @Valid UserResetPasswordRequest request) {

        log.info("Received reset password request: {}", request);

        UserResetPasswordResponse response = userAuthService.resetPassword(request);
        log.info("Reset password for user {} successfully.", response.user().id());

        return new ResponseEntity<>(
                ApiResponse.getSuccessResponse(response),
                cookieHeaderBuilder.build("refreshToken", response.refreshToken(), refreshTokenDuration),
                HttpStatus.OK
        );
    }
}

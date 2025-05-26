package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.dto.request.RequireOtpRequest;
import com.anonymous.streaming_platform.dto.request.UserAuthenticationRequest;
import com.anonymous.streaming_platform.dto.request.UserRegistrationRequest;
import com.anonymous.streaming_platform.dto.request.UserResetPasswordRequest;
import com.anonymous.streaming_platform.dto.response.RefreshTokenResponse;
import com.anonymous.streaming_platform.dto.response.UserAuthenticationResponse;
import com.anonymous.streaming_platform.dto.response.UserRegistrationResponse;
import com.anonymous.streaming_platform.dto.response.UserResetPasswordResponse;
import com.anonymous.streaming_platform.entity.mysql.Role;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.ConflictDataException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mysql.RoleRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAuthService {

    @Value("${default.avatar}")
    private String defaultAvatar;

    @Value("${jwt.access-token.duration}")
    private Long accessTokenDuration;

    @Value("${jwt.refresh-token.duration}")
    private Long refreshTokenDuration;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final OtpTokenService otpTokenService;
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final UserMapper userMapper;
    private final CodeGenerator codeGenerator;
    private final RoleRepository roleRepository;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final JwtBlacklistService jwtBlacklistService;

    public void requireRegistrationOtp(RequireOtpRequest request) {

        String email = request.email();

        boolean isExistUser = userRepository.existsByEmail(email);

        if (isExistUser) {
            log.warn("User with email {} already exists.", email);
            throw new ConflictDataException(Error.USER_EMAIL_EXISTS, email);
        }

        log.info("Starting registration OTP process for email {}.", email);

        // Tạo OTP với OTP service (tự quản lý cache OTP, tự xử lý lỗi)
        String otp = otpTokenService.generateOtpToken(email);

        // Gửi OTP qua email
        emailSenderService.sendRegistrationOtpEmail(email, otp);
    }

    public void requireResetPasswordOtp(RequireOtpRequest request) {

        String email = request.email();

        // Kiểm tra phải tồn tại user theo email -> cho phép reset password
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.warn("No user found for provided email {}", email);
            return new BusinessLogicException(Error.USER_EMAIL_NOT_EXIST, email);
        });

        log.info("Starting reset password OTP process for email {}.", email);

        // Tạo OTP với OTP service (tự quản lý cache OTP, tự xử lý lỗi)
        String otp = otpTokenService.generateOtpToken(email);

        // Gửi OTP qua email
        emailSenderService.sendResetPasswordOtpEmail(email, user.getUsername(), otp);
    }

    public UserRegistrationResponse register(UserRegistrationRequest request) {

        // Kiểm tra email và xác minh mã OTP
        boolean isVerified = !userRepository.existsByEmail(request.email())
                && otpTokenService.validateOtpToken(request.email(), request.code());

        if (!isVerified) {
            log.warn("OTP for email {} is incorrect or expired.", request.email());
            throw new BusinessLogicException(Error.OTP_INCORRECT_OR_EXPIRED, request.email());
        }

        // Nếu xác minh thành công email & OTP -> thu hồi OTP
        otpTokenService.revokeOtpToken(request.email());

        // Tạo user mới
        log.info("Starting registration user process for email {}.", request.email());
        User user = userMapper.mapToUserEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAvatar(defaultAvatar);
        user.setUsername(codeGenerator.nextCode(CodeGenerator.CodeType.USERNAME));

        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new EntityNotFoundException(Error.ROLE_NOT_FOUND, "USER"));
        user.setRole(role);


        User createdUser = userRepository.save(user);

        // Điều hướng đăng nhập ngay sau khi đăng ký
        String accessToken = jwtTokenGenerator
                .generateToken(createdUser, JwtTokenGenerator.TokenType.ACCESS, accessTokenDuration);
        String refreshToken = jwtTokenGenerator
                .generateToken(createdUser, JwtTokenGenerator.TokenType.REFRESH, refreshTokenDuration);

        return UserRegistrationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.mapToUserSummaryResponse(createdUser))
                .build();
    }


    public UserAuthenticationResponse authenticate(UserAuthenticationRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));

            User user = (User) authentication.getPrincipal();
            user.setLogonAt(LocalDateTime.now());

            String accessToken = jwtTokenGenerator
                    .generateToken(user, JwtTokenGenerator.TokenType.ACCESS, accessTokenDuration);
            String refreshToken = jwtTokenGenerator
                    .generateToken(user, JwtTokenGenerator.TokenType.REFRESH, refreshTokenDuration);

            userRepository.save(user);

            return UserAuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(userMapper.mapToUserSummaryResponse(user))
                    .build();

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            throw new AuthenticationException(Error.LOGIN_FAILED);
        } catch (LockedException | DisabledException e) {
            throw new AuthenticationException(Error.USER_HAS_BEEN_BLOCKED);
        }
    }

    public RefreshTokenResponse refreshToken(String refreshToken) {

        // Xác minh refresh token
        JWTClaimsSet claimsSet = jwtTokenGenerator.verifyToken(refreshToken);

        log.info("Verified provided refresh token");

        User user = userRepository.findByEmail(claimsSet.getSubject())
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, claimsSet.getSubject()));

        // Tạo access token mới, refresh token mới
        String accessToken = jwtTokenGenerator
                .generateToken(user, JwtTokenGenerator.TokenType.ACCESS, accessTokenDuration);
        String jwtRefreshToken = jwtTokenGenerator
                .generateToken(user, JwtTokenGenerator.TokenType.REFRESH, refreshTokenDuration);

        // Thêm refresh token cũ vào black list
        jwtBlacklistService.addTokenToBlacklist(claimsSet.getJWTID(), claimsSet.getExpirationTime());
        log.info("Added old refresh token {} to blacklist", refreshToken);

        return RefreshTokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(jwtRefreshToken)
                .user(userMapper.mapToUserSummaryResponse(user))
                .build();
    }

    public Long logout(String refreshToken) { // return userId

        // Xác minh refresh token
        JWTClaimsSet claimsSet = jwtTokenGenerator.verifyToken(refreshToken);

        // Thu hồi refresh token
        jwtBlacklistService.addTokenToBlacklist(claimsSet.getJWTID(), claimsSet.getExpirationTime());
        log.info("Added refresh token {} to blacklist", refreshToken);

        User user = userRepository.findByEmail(claimsSet.getSubject())
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, claimsSet.getSubject()));

        return user.getId();
    }

    public UserResetPasswordResponse resetPassword(UserResetPasswordRequest request) {

        // Xác minh mã OTP
        boolean isVerified = otpTokenService.validateOtpToken(request.email(), request.code());

        if (!isVerified) {
            log.warn("OTP for email {} is incorrect or expired.", request.email());
            throw new BusinessLogicException(Error.OTP_INCORRECT_OR_EXPIRED);
        }

        // Thu hồi mã OTP
        otpTokenService.revokeOtpToken(request.email());

        log.info("Revoked OTP for email {}.", request.email());

        // Lấy thông tin user để cập nhật mật khẩu
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessLogicException(Error.OTP_INCORRECT_OR_EXPIRED));

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
        log.info("Updated password for user {}.", user.getUsername());

        // Điều hướng đăng nhập ngay sau khi đổi mật khẩu
        String accessToken = jwtTokenGenerator
                .generateToken(user, JwtTokenGenerator.TokenType.ACCESS, accessTokenDuration);
        String refreshToken = jwtTokenGenerator
                .generateToken(user, JwtTokenGenerator.TokenType.REFRESH, refreshTokenDuration);

        return UserResetPasswordResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userMapper.mapToUserSummaryResponse(user))
                .build();
    }

}

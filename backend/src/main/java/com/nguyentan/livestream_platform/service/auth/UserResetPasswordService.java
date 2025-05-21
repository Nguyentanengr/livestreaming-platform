package com.nguyentan.livestream_platform.service.auth;

import com.nguyentan.livestream_platform.converter.UserConverter;
import com.nguyentan.livestream_platform.dto.request.UserResetPasswordRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.UserResetPasswordResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
import com.nguyentan.livestream_platform.service.otp.OTPTokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserResetPasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final OTPTokenManager tokenManager;
    private final UserConverter userConverter;

    public UserResetPasswordResponse resetPassword(UserResetPasswordRequest request) {

        boolean isVerified = tokenManager.validateOTPToken(request.email(), request.code());

        if (!isVerified) throw new BusinessException(CodeResponse.OTP_INCORRECT_OR_EXPIRED);

        // invalid OTP token
        tokenManager.removeOTPToken(request.email());

        // get user by email
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(CodeResponse.OTP_INCORRECT_OR_EXPIRED));

        // update password into user
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        // save user
        userRepository.save(user);

        // generate access & refresh token
        String jwtAccessToken = jwtTokenGenerator.generateAccessToken(user);
        String jwtRefreshToken = jwtTokenGenerator.generateRefreshToken(user);

        return UserResetPasswordResponse.builder()
                .user(userConverter.mapToUserResponse(user))
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }
}

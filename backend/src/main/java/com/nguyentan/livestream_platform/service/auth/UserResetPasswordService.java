package com.nguyentan.livestream_platform.service.auth;

import com.nguyentan.livestream_platform.dto.request.UserResetPasswordRequest;
import com.nguyentan.livestream_platform.dto.response.UserRegistrationResponse;
import com.nguyentan.livestream_platform.dto.response.UserResetPasswordResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserResetPasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenGenerator tokenGenerator;

    public UserResetPasswordResponse resetPassword(UserResetPasswordRequest request) {

        // get user by email
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // update password into user
        user.setPassword(passwordEncoder.encode(request.newPassword()));

        // save user
        userRepository.save(user);

        // generate access & refresh token
        String jwtAccessToken = tokenGenerator.generateAccessToken(user);
        String jwtRefreshToken = tokenGenerator.generateRefreshToken(user);

        return UserResetPasswordResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }
}

package com.nguyentan.livestream_platform.service.auth;


import com.nguyentan.livestream_platform.converter.UserConverter;
import com.nguyentan.livestream_platform.dto.request.UserRegistrationRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.UserRegistrationResponse;
import com.nguyentan.livestream_platform.entity.Role;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.repository.RoleRepository;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
import com.nguyentan.livestream_platform.service.otp.OTPTokenManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final UserConverter userConverter;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final OTPTokenManager tokenManager;


    public UserRegistrationResponse register(UserRegistrationRequest request) {

        // Verify the email & validate token
        boolean isVerified = !userRepository.existsByEmail(request.email())
                && tokenManager.validateOTPToken(request.email(), request.code());

        if (!isVerified) {
            throw new BusinessException(CodeResponse.OTP_INCORRECT_OR_EXPIRED);
        }

        User user = userConverter.mapToUserEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));

        Role role = roleRepository.findByName("USER").orElseThrow(()
                -> new BusinessException(CodeResponse.ROLE_NOT_FOUND));
        user.setRole(role);

        // catch exception in here
        user = userRepository.save(user);

        String jwtAccessToken = jwtTokenGenerator.generateAccessToken(user);
        String jwtRefreshToken = jwtTokenGenerator.generateRefreshToken(user);

        return UserRegistrationResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();

    }
}

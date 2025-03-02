package com.nguyentan.livestream_platform.service.auth;


import com.nguyentan.livestream_platform.converter.UserConverter;
import com.nguyentan.livestream_platform.dto.request.UserRegistrationRequest;
import com.nguyentan.livestream_platform.dto.response.UserRegistrationResponse;
import com.nguyentan.livestream_platform.entity.Role;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.RoleRepository;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
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
    private final JwtTokenGenerator tokenGenerator;


    public UserRegistrationResponse register(UserRegistrationRequest request) {

        User user = userConverter.mapToUserEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));

        Role role = roleRepository.findByName("USER").orElseThrow(()
                -> new RuntimeException("Could not find role by name: USER"));
        user.setRole(role);

        try {
            user = userRepository.save(user);
        } catch (Exception e) {
            log.error("An error occurred while save user into database");
            throw new RuntimeException("An error occurred while save user into database: " + e.getMessage());
        }

        String jwtAccessToken = tokenGenerator.generateAccessToken(user);
        String jwtRefreshToken = tokenGenerator.generateRefreshToken(user);

        UserRegistrationResponse response = UserRegistrationResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();

        return response;
    }
}

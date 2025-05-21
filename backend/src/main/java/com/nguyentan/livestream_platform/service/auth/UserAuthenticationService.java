package com.nguyentan.livestream_platform.service.auth;

import com.nguyentan.livestream_platform.converter.UserConverter;
import com.nguyentan.livestream_platform.dto.request.UserAuthenticationRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.UserAuthenticationResponse;
import com.nguyentan.livestream_platform.dto.response.UserResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator tokenGenerator;
    private final UserConverter userConverter;


    public UserAuthenticationResponse authenticate(UserAuthenticationRequest request) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password()));

            User user = (User) authentication.getPrincipal();

            String jwtAccessToken = tokenGenerator.generateAccessToken(user);
            String jwtRefreshToken = tokenGenerator.generateRefreshToken(user);

            UserResponse userResponse = userConverter.mapToUserResponse(user);

            return UserAuthenticationResponse.builder()
                    .user(userResponse)
                    .accessToken(jwtAccessToken)
                    .refreshToken(jwtRefreshToken)
                    .build();

        } catch (UsernameNotFoundException | BadCredentialsException e) {
            throw new BusinessException(CodeResponse.LOGIN_FAIL);
        } catch (LockedException e) {
            throw new BusinessException(CodeResponse.ACCOUNT_HAS_BEEN_LOCKED);
        }
    }
}

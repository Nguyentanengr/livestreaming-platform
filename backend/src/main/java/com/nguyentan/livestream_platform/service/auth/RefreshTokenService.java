package com.nguyentan.livestream_platform.service.auth;


import com.nguyentan.livestream_platform.dto.request.RefreshTokenRequest;
import com.nguyentan.livestream_platform.dto.response.CodeResponse;
import com.nguyentan.livestream_platform.dto.response.RefreshTokenResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.exception.BusinessException;
import com.nguyentan.livestream_platform.repository.UserRepository;
import com.nguyentan.livestream_platform.service.jwt.JwtBlackList;
import com.nguyentan.livestream_platform.service.jwt.JwtTokenGenerator;
import com.nguyentan.livestream_platform.service.jwt.VerifyJwtRefreshToken;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final JwtBlackList blackList;
    private final UserRepository userRepository;
    private final JwtTokenGenerator tokenGenerator;
    private final VerifyJwtRefreshToken verifyJwtRefreshToken;

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {

        // verify token: check token format, expiration time, black list
        JWTClaimsSet claimsSet = verifyJwtRefreshToken.verifyToken(request.token());

        // get user by email
        final User user = userRepository.findByEmail(claimsSet.getSubject())
                .orElseThrow(() -> new BusinessException(CodeResponse.INVALID_REFRESH_TOKEN));

        String jwtAccessToken = tokenGenerator.generateAccessToken(user);
        // generate a new refresh token with an expiration time similar to the old one
        String jwtRefreshToken = tokenGenerator.generateRefreshToken(user, claimsSet.getExpirationTime());

        // add old token into black list
        blackList.cacheItem(claimsSet.getJWTID(), claimsSet.getExpirationTime());

        return RefreshTokenResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }
}

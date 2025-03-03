package com.nguyentan.livestream_platform.service.auth;


import com.nguyentan.livestream_platform.dto.request.LogoutRequest;
import com.nguyentan.livestream_platform.service.jwt.JwtBlackList;
import com.nguyentan.livestream_platform.service.jwt.VerifyJwtRefreshToken;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLogoutService {

    private final VerifyJwtRefreshToken verifyJwtRefreshToken;
    private final JwtBlackList blackList;

    public void logout(LogoutRequest request) {

        // verify refresh token, if token is invalid, send 401 Unauthorized to client
        // and clear access & refresh token in local storage
        JWTClaimsSet claimsSet = verifyJwtRefreshToken.verifyToken(request.token());

        // disable token if token is verified
        blackList.cacheItem(claimsSet.getJWTID(), claimsSet.getExpirationTime());
    }
}

package com.nguyentan.livestream_platform.service.auth;


import com.nguyentan.livestream_platform.dto.request.UserLogoutRequest;
import com.nguyentan.livestream_platform.service.jwt.JwtBlackList;
import com.nguyentan.livestream_platform.service.jwt.VerifyJwtRefreshToken;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserLogoutService {

    private final VerifyJwtRefreshToken verifyJwtRefreshToken;
    private final JwtBlackList blackList;

    public void logout(UserLogoutRequest request) {

        // verify refresh token, if token is invalid, send 401 Unauthorized to client
        // and clear access & refresh token in local storage
        try {
            JWTClaimsSet claimsSet = verifyJwtRefreshToken.verifyToken(request.token());

            // disable token if token is verified
            blackList.cacheItem(claimsSet.getJWTID(), claimsSet.getExpirationTime());
            log.info("Push refresh token into blacklist: " + request.token());
        } catch (Exception e) {
            log.error("An error occurred while logout user: " + e.getMessage());
        }
    }
}

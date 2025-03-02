package com.nguyentan.livestream_platform.service.jwt;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class VerifyJwtRefreshToken {

    @Value("${jwt.secret-key}")
    private String secretKey;

    private final JwtBlackList blackList;

    public SignedJWT verifyToken(String token) {

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date exp = signedJWT.getJWTClaimsSet().getExpirationTime();
            var jit = signedJWT.getJWTClaimsSet().getJWTID();

            // This code only verifies the integrity of the token by checking its signature.
            // It ensures that the token has not been tampered with but does NOT validate
            // claims like expiration (exp), issuer (iss), or audience (aud).
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes());
            boolean verified = signedJWT.verify(verifier);

            boolean isExpired = exp.before(new Date());

            boolean isExistInBlackedList = blackList.isExist(jit);

            if (!verified || isExpired || isExistInBlackedList) {
                throw new RuntimeException("Jwt token is invalid or expired");
            }

            return signedJWT;

        } catch (ParseException | JOSEException | RuntimeException e) {
            throw new RuntimeException("An error occurred while verify token: " + e.getMessage());
        }
    }

}

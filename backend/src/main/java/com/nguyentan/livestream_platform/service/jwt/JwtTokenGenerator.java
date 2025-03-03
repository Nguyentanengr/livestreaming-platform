package com.nguyentan.livestream_platform.service.jwt;

import com.nguyentan.livestream_platform.entity.User;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
public class JwtTokenGenerator {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.token.issuer}")
    private String issuer;

    @Value("${jwt.access-token-duration}")
    private Integer accessTokenDuration; // 5 minutes

    @Value("${jwt.refresh-token-duration}")
    private Integer refreshTokenDuration; // 1/2 year = 262800 minutes

    private final JWSAlgorithm alg = JWSAlgorithm.HS512;

    public String generateAccessToken(final User user) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(user.getEmail())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(accessTokenDuration, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while serialize jwt object: " + e.getMessage());
        }
    }

    public String generateRefreshToken(final User user) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(user.getEmail())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(refreshTokenDuration, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while serialize jwt object: " + e.getMessage());
        }
    }

    public String generateRefreshToken(final User user, Date exp) {

        // create header jwt token
        JWSHeader header = new JWSHeader(alg);

        // create payload jwt token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(user.getEmail())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(exp)
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // create jwt object with header and payload
        JWSObject object = new JWSObject(header, payload);

        // sign secret key into jwt object and serialize jwt object -> jwt token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while serialize jwt object: " + e.getMessage());
        }
    }



    private String buildScope(final User user) {
        StringJoiner stringJoiner = new StringJoiner("");
        stringJoiner.add("ROLE_" + user.getRole().getName());
        return stringJoiner.toString();
    }
}

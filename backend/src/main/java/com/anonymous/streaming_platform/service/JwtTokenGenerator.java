package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

/*
    - Class chứa các phương thức tạo token tùy thuộc vào token type muốn tạo
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenGenerator {

    private final JWSAlgorithm alg = JWSAlgorithm.HS512;
    private final JwtBlacklistService jwtBlacklistService;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.issuer}")
    private String issuer;

    public enum TokenType {
        ACCESS, REFRESH
    }

    public String generateToken(final User user, TokenType tokenType, Long minutes) {

        // Nếu ngày hết hạn được cung cấp (trường hợp muốn refresh token mới
        // nhưng vẫn giữ ngày hết hạn cũ).

        var expirationTime = new Date(Instant.now().plus(minutes, ChronoUnit.MINUTES).toEpochMilli());

        // Thêm thông tin thuật toán mã hóa vào header
        JWSHeader header = new JWSHeader(alg);

        // Tạo cấu trúc cho token
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .jwtID(UUID.randomUUID().toString())
                .subject(user.getEmail())
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(expirationTime)
                .claim("scope", buildScope(user))
                .claim("user_id", user.getId())
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        // Tạo token hoàn chỉnh với header và payload
        JWSObject object = new JWSObject(header, payload);

        // Thực hiện ký số với token
        try {
            object.sign(new MACSigner(secretKey.getBytes()));
            log.info("Generated {} token for user {}.", tokenType, user.getUsername());
            return object.serialize();
        } catch (Exception e) {
            log.error("An error occurred while serialize jwt object: " + e.getMessage());
            throw new InternalServerException(Error.JWT_TOKEN_CANNOT_GENERATE);
        }
    }

    public JWTClaimsSet verifyToken(String token) {

        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date exp = signedJWT.getJWTClaimsSet().getExpirationTime();
            var jti = signedJWT.getJWTClaimsSet().getJWTID();

            // Xác minh token
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes());
            boolean verified = signedJWT.verify(verifier);

            boolean isExpired = exp.before(new Date());

            boolean isExistInBlackedList = jwtBlacklistService.isTokenInBlacklist(jti);

            if (!verified || isExpired || isExistInBlackedList) {
                log.warn("Token {} is invalid or expired.", token);
                throw new AuthenticationException(Error.INVALID_REFRESH_TOKEN, token);
            }

            return signedJWT.getJWTClaimsSet();

        } catch (ParseException | JOSEException e) {
            log.error("An error occurred while parsing token: {} ", e.getMessage(), e);
            throw new InternalServerException(Error.JWT_TOKEN_CANNOT_PARSE);
        }
    }

    private String buildScope(final User user) {
        return "ROLE_" + user.getRole().getName().toUpperCase();
    }


}

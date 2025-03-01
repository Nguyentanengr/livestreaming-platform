package com.nguyentan.livestream_platform.service.OTP;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.xml.datatype.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OTPTokenManager {

    private final OTPTokenCache tokenCache; // <email, OTP>
    private final OTPTokenGenerator tokenGenerator;


    public String generateOTPToken(String identity) {

        // Check if email have previous token
        Optional<String> cacheValue = tokenCache.getTokenById(identity);

        if (cacheValue.isPresent()) {
            // Not allowed generate token

            log.error("Cannot generate OTP because previous OTP is existing in cache");
            throw new RuntimeException("Cannot generate OTP for email in this time");
        }

        // generate & caching token
        String OTP = tokenGenerator.generateToken();

        tokenCache.cachingToken(identity, OTP, 60);

        log.info("All Item in Redis: " + tokenCache.getAllItem());

        return OTP;
    }

    public boolean validateOTPToken(String identity, String OTP) {

        boolean isFormatted = tokenGenerator.checkFormat(OTP);

        // Get token with email
        Optional<String> cacheValue = tokenCache.getTokenById(identity);

        boolean isValidated = isFormatted && cacheValue.isPresent() && OTP.equals(cacheValue.get());

        if (!isValidated) {
            throw new RuntimeException("OTP is incorrect or expired");
        }

        return true;
    }

    public void removeOTPToken(String identity) {
        tokenCache.removeById(identity);
    }

}

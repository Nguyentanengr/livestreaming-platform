package com.nguyentan.livestream_platform.service.OTP;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.xml.datatype.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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
            throw new RuntimeException("Cannot generate OTP for email in this time");
        }

        // generate & caching token
        String OTP = tokenGenerator.generateToken();

        tokenCache.cachingToken(identity, OTP, 60);

        return OTP;
    }

    public void validateOTPToken(String identity, String OTP) {

        boolean isFormatted = tokenGenerator.checkFormat(OTP);

        // Get token with email
        Optional<String> cacheValue = tokenCache.getTokenById(identity);

        boolean isValidated = isFormatted && cacheValue.isPresent() && OTP.equals(cacheValue.get());

        if (!isValidated) {
            throw new RuntimeException("OTP is incorrect or expired");
        }
    }

    public void removeOTPToken(String identity) {
        tokenCache.removeById(identity);
    }

}

package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.exception.ConflictDataException;
import com.anonymous.streaming_platform.exception.error.Error;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;


/*
    - Class này bọc toàn bộ thao tác với cache, chứa các phương phức generate, validate, revoke (thu hồi)
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpTokenService {

    private static final String OTP_TOKEN_PREFIX = "otp:";

    @Value("${cache.otp.duration}")
    private Integer otpDuration;

    private final CacheService cacheService;
    private final CodeGenerator codeGenerator;

    public String generateOtpToken(String identity) {

        log.info("Checking if identity {} has an OTP token.", identity);

        String key = OTP_TOKEN_PREFIX + identity;

        // Nếu OTP trước đó chưa hết hạn (Tồn tại trong cache) thì không cho phép tạo OTP
        if (cacheService.containsKey(key)) {
            log.warn("Identity {} already has an OTP token.", identity);
            throw new ConflictDataException(Error.OTP_TOKEN_CONFLICT, identity);
        }

        String otp = codeGenerator.nextCode(CodeGenerator.CodeType.OTP);

        // Cache OTP token cho identity
        log.info("Generated OTP token for email {}: {}", identity, otp);
        cacheService.set(key, otp, otpDuration, TimeUnit.MINUTES);

        return otp;
    }

    public boolean validateOtpToken(String identity, String otp) {

        String key = OTP_TOKEN_PREFIX + identity;

        // Kiểm tra định dạng OTP
        boolean isFormatted = codeGenerator.isValidCode(otp, CodeGenerator.CodeType.OTP);

        // Kiểm tra OTP hợp lệ (tồn tại trong cache)
        Optional<String> cacheValue = cacheService.get(key, String.class);

        boolean isValid = isFormatted && cacheValue.isPresent() && cacheValue.get().equals(otp);

        log.info("OTP token {} for email {} is {}.", otp, identity, isValid ? "valid" : "invalid");

        return isValid;
    }

    public void revokeOtpToken(String identity) {

        String key = OTP_TOKEN_PREFIX + identity;
        cacheService.delete(key);

        log.info("Revoked OTP token for {}.", identity);
    }

}

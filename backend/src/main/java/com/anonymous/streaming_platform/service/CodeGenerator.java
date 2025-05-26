package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.util.PatternReplacer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

/*
    - Cung cấp phương thức tạo mã mới và kiểm tra định dạng mã theo từng Code Type
 */

@Slf4j
@Service
public class CodeGenerator {

    private static final SecureRandom random = new SecureRandom();
    private static final String OTP_PATTERN = "######";
    private static final String REEL_ID_PATTERN = "####-####-####";
    private static final String STREAM_ID_PATTERN = "####-####-####";
    private static final String DEFAULT_USERNAME_PATTERN = "User############";
    private static final String RANDOM_FILE_NAME_PATTERN = "########_########_########";
    private static final char REPLACE_HOOK = '#';
    private static final String NUMERIC_BASE = "0123456789";  // Phạm vi 0 - 9
    private static final String ALPHA_BASE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  // Phạm vi chữ cái alpha

    public enum CodeType {
        OTP, REEL_ID, USERNAME, FILE_NAME, STREAM_ID;
    }

    public String nextCode(CodeType codeType) {
        return switch (codeType) {
            case OTP -> generateCode(OTP_PATTERN, NUMERIC_BASE);
            case REEL_ID -> generateCode(REEL_ID_PATTERN, ALPHA_BASE);
            case USERNAME -> generateCode(DEFAULT_USERNAME_PATTERN, ALPHA_BASE);
            case FILE_NAME -> generateCode(RANDOM_FILE_NAME_PATTERN, ALPHA_BASE);
            case STREAM_ID -> generateCode(STREAM_ID_PATTERN, ALPHA_BASE);
        };
    }

    private String generateCode(String pattern, String base) {
        PatternReplacer token = new PatternReplacer(pattern, REPLACE_HOOK);
        while (token.isReplaceable()) {
            int randomSymbolIndex = random.nextInt(base.length());
            token.replace(base.charAt(randomSymbolIndex));
        }

        log.info("Generated code for {}: {}", pattern, token.toString());
        return token.toString();
    }

    public boolean isValidCode (String code, CodeType codeType) {
        return switch (codeType) {
            case OTP -> validateCode(code, OTP_PATTERN, NUMERIC_BASE);
            case REEL_ID -> validateCode(code, REEL_ID_PATTERN, ALPHA_BASE);
            case USERNAME -> validateCode(code, DEFAULT_USERNAME_PATTERN, ALPHA_BASE);
            case FILE_NAME -> validateCode(code, RANDOM_FILE_NAME_PATTERN, ALPHA_BASE);
            case STREAM_ID -> validateCode(code, STREAM_ID_PATTERN, ALPHA_BASE);
        };
    }

    private boolean validateCode(String code, String pattern, String base) {
        if (code.length() != pattern.length()) {
            return false;
        }

        for (int i = 0; i < pattern.length(); i++) {
            if (pattern.charAt(i) != REPLACE_HOOK) continue;
            if (!base.contains(String.valueOf(code.charAt(i)))) {
                return false;
            }
        }

        log.info("Code {} is valid for {}.", code, pattern);
        return true;
    }

}

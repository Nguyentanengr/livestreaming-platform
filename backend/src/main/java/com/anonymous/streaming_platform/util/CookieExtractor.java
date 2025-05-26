package com.anonymous.streaming_platform.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Slf4j
@Component
public class CookieExtractor {

    public String extractFromHeader(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (Objects.nonNull(cookies)) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    log.info("Extracted cookie {} from header.", cookieName);
                    return cookie.getValue();
                }
            }
        }
        log.warn("Cookie {} not found in header.", cookieName);
        return null;
    }
}

package com.anonymous.streaming_platform.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CookieHeaderBuilder {

    public HttpHeaders build(String cookieName, String cookieValue, long maxAge) {
        ResponseCookie cookie = ResponseCookie
                .from(cookieName, cookieValue)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(maxAge)
                .sameSite("None")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return headers;
    }

    public HttpHeaders removeCookie(String name) {
        ResponseCookie cookie = ResponseCookie
                .from(name, "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None") // chỉ cho phép sử dụng https, none bắt buộc dùng secure(true) cho các trình duyệt hiện đại
                .build();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return headers;
    }
}

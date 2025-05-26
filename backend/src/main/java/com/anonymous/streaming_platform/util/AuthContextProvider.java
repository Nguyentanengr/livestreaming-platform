package com.anonymous.streaming_platform.util;

import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthContextProvider {

    private final UserRepository userRepository;

    public Optional<User> getUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        // Nếu người dùng đã đăng nhập
        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            User user = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new AuthenticationException(Error.UNAUTHORIZED));

            log.info("Current login user is {}.", user.getEmail());
            return Optional.of(user);
        }

        // Người dùng khách
        log.info("Current user is guest.");
        return Optional.empty();
    }

    public Optional<String> getEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.of(authentication.getName());
        }
        log.info("Current user is guest.");
        return Optional.empty();
    }

    public Optional<Long> getUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            if (authentication.getPrincipal() instanceof Jwt) {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                return Optional.of((Long) jwt.getClaims().get("user_id"));
            }
            log.warn("Authentication principal is not Jwt.");
        }
        log.info("Current user is guest.");
        return Optional.empty();
    }
}

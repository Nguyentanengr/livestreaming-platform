package com.anonymous.streaming_platform.config;

import com.anonymous.streaming_platform.controller.*;
import com.anonymous.streaming_platform.dto.response.UserProfileResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ErrorResponse;
import com.anonymous.streaming_platform.exception.error.Error;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.crypto.spec.SecretKeySpec;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final String[] PUBLIC_ENDPOINTS = {
            UserAuthController.AUTH_URL + "/**",
            UserProfileController.USER_URL + "/*/profile",
            UserProfileController.USER_URL + "/*/streams",
            UserProfileController.USER_URL + "/*/reels",
            CategoryController.CATEGORY_URL + "/**",
            UserProfileController.USER_URL + "/*/streams/live",
            FakerController.FAKE_URL + "/**",
            UserProfileController.USER_URL + "/recommended",
            ReelController.REEL_URL + "/recommended",
            StreamController.STREAM_URL + "/streams/outstanding",
            StreamController.STREAM_URL + "/streams/recommended",
            StreamController.STREAM_URL + "/streams/*",
            StreamController.STREAM_URL + "/categories/**",
            CommentController.COMMENT_URL + "/*/comments/*/like",
            CommentController.COMMENT_URL + "/*/comments/*/unlike",

    };

    private final String[] PUBLIC_GET_ENDPOINTS = {
            ReelController.REEL_URL + "/**",
            ChatController.CHAT_URL + "/**",
            CommentController.COMMENT_URL + "/*/comments",
            StreamController.STREAM_URL + "/streams",
    };

    private final String[] AUTH_ENDPOINTS = {
            UserProfileController.USER_URL + "/me/profile",
            UserProfileController.USER_URL + "/me/password",
            StreamController.STREAM_URL + "/streams/followed",
            UserProfileController.USER_URL + "/followed",
            UserProfileController.USER_URL + "/*/follow",
            UserProfileController.USER_URL + "/*/unfollow",
            ReelController.REEL_URL + "/*/like",
            ReelController.REEL_URL + "/*/unlike",
            CategoryController.CATEGORY_URL + "/*/interested",
            UserProfileController.USER_URL + "/me",
            NotificationController.NOTIFICATION_URL + "/**"
    };

    @Value("${jwt.secret-key}")
    private String secretKey;

    private final ObjectMapper objectMapper;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Bật CORS với cấu hình tùy chỉnh
                .authorizeHttpRequests(request -> {
                    request.requestMatchers("/ws/**").permitAll()
                            .requestMatchers(AUTH_ENDPOINTS).authenticated()
                            .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS).permitAll()
                            .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                            .anyRequest().authenticated();
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(auth -> {
                    auth.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
                            .authenticationEntryPoint(((request, response, authException) -> {
                                response.setStatus(401);
                                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                                Error error = Error.UNAUTHORIZED;
                                ApiResponse<Void> apiResponse = ApiResponse.getErrorResponse(ErrorResponse.get(error));

                                response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
                                response.flushBuffer();
                            }));
                });

        return httpSecurity.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HS512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

    @Bean // bộ lọc cors cho cả spring và spring security (oauth 2 trong trường hợp này)
    // Các API yêu cầu xác thực sẽ được httpSecurity xử lý, nếu config cors cho httpSecurity
    // nó sẽ lọc cors thêm lần nữa và chặt chẽ hơn, ngược lại nếu không config cors cho
    // cho httpSecurity, các auth api sẽ đi qua khỏi cors của spring nhưng ko qua httpSecurity
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("https://localhost:3000", "http://localhost:3000"));
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean // bộ lọc cors trong spring (mức rộng hơn)
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }
}
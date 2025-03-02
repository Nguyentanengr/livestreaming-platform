package com.nguyentan.livestream_platform.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyentan.livestream_platform.dto.response.EntityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
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

@Configuration
@EnableWebSecurity
public class WebConfig {

    private final String[] PUBLIC_ENDPOINTS = {
            "/api/v1/auth/register", "/api/v1/auth/register/require-otp", "/api/v1/auth/reset-password", "api/v1/auth/authenticate",
    };

    @Value("${jwt.secret-key}")
    private String secretKey;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .authorizeHttpRequests(request -> {
                    request.requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                            .anyRequest().authenticated();
                })
                .oauth2ResourceServer(auth -> {
                    auth.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
                            .authenticationEntryPoint(((request, response, authException) -> {
                                // Process auth exception in here
                                response.setStatus(401);
                                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                                EntityResponse<?> entityResponse = EntityResponse.builder()
                                        .code(401L)
                                        .message("User is unauthorized")
                                        .build();

                                ObjectMapper mapper = new ObjectMapper();

                                response.getWriter().write(mapper.writeValueAsString(entityResponse));
                                response.flushBuffer();
                            }));
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return httpSecurity.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HS512");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }


    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource urls = new UrlBasedCorsConfigurationSource();
        urls.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urls);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

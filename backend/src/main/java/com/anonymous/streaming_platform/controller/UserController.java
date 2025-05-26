package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.ListFollowedUserResponse;
import com.anonymous.streaming_platform.dto.response.ListRcmUserResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.service.UserService;
import com.anonymous.streaming_platform.util.CookieExtractor;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@RequestMapping(UserProfileController.USER_URL)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final CookieExtractor cookieExtractor;

    @GetMapping("/followed")
    public ApiResponse<ListFollowedUserResponse> retrieveFollowedUsers(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size

    ) {
        log.info("Received request to retrieve followed users " +
                "with key {} and page {} and size {}", key, page, size);

        var normalPage = Math.max(page, 0);
        var normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);

        var response = userService.retrieveFollowedUsers(key, pageRequest);
        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/recommended")
    public ApiResponse<ListRcmUserResponse> retrieveRecommendedUsers(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size

    ) {
        log.info("Received request to retrieve recommended users " +
                "with key {} and page {} and size {}", key, page, size);

        var normalPage = Math.max(page, 0);
        var normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);

        var response = userService.retrieveRecommendedUsers(key, pageRequest);
        return ApiResponse.getSuccessResponse(response);
    }

    @DeleteMapping("/me")
    public ApiResponse<Void> deleteUser(HttpServletRequest request) {

        log.info("Received request to delete user.");
        String refreshToken = cookieExtractor.extractFromHeader(request, "refreshToken");

        if (Objects.isNull(refreshToken)) {
            throw new AuthenticationException(Error.REFRESH_TOKEN_NOT_PROVIDED);
        }
        userService.deleteUser(refreshToken);
        return ApiResponse.getSuccessResponse(null);
    }

}

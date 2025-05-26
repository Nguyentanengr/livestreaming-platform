package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(UserProfileController.USER_URL)
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping("/{username}/follow")
    public ApiResponse<Void> createConnection(
            @PathVariable("username") String username
    ) {
        log.info("Received request to create connection with username {}.", username);

        connectionService.createConnection(username);

        return ApiResponse.getSuccessResponse(null);
    }

    @DeleteMapping("/{username}/unfollow")
    public ApiResponse<Void> deleteConnection(
            @PathVariable("username") String username
    ) {
        log.info("Received request to delete connection with username {}.", username);

        connectionService.deleteConnection(username);

        return ApiResponse.getSuccessResponse(null);
    }
}

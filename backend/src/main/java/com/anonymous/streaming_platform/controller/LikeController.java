package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(ReelController.REEL_URL)
@RequiredArgsConstructor
public class LikeController {


    private final LikeService liveService;


    @PostMapping("/{id}/like")
    public ApiResponse<Void> createLike(@PathVariable("id") String id) {

        log.info("received request to like reel with id {}.", id);
        liveService.createLike(id);

        return ApiResponse.getSuccessResponse(null);
    }

    @DeleteMapping("/{id}/unlike")
    public ApiResponse<Void> deleteLike(@PathVariable("id") String id) {

        log.info("received request to unlike reel with id {}.", id);
        liveService.deleteLike(id);

        return ApiResponse.getSuccessResponse(null);
    }
}

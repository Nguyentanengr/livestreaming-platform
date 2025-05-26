package com.anonymous.streaming_platform.controller;

import com.anonymous.streaming_platform.dto.request.ReelCreationRequest;
import com.anonymous.streaming_platform.dto.response.ListReelRcmResponse;
import com.anonymous.streaming_platform.dto.response.ReelCreationResponse;
import com.anonymous.streaming_platform.dto.response.ReelRcmResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.ReelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping(ReelController.REEL_URL)
@RequiredArgsConstructor
public class ReelController {

    public static final String REEL_URL = "api/v1/reels";

    private final ReelService reelService;

    @PostMapping()
    public ApiResponse<ReelCreationResponse> createReel(
            @RequestPart("reel") ReelCreationRequest request,
            @RequestPart("video") MultipartFile video,
            @RequestPart("thumbnail") MultipartFile thumbnail
    ) {

        log.info("Received request to create reel: {}", request);

        var response = reelService.createReel(request, video, thumbnail);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/recommended")
    public ApiResponse<ListReelRcmResponse> retrieveRecommendedReels(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        log.info("Received request to retrieve recommended reels " +
                "with key {} and page {} and size {}", key, page, size);

        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        var response = reelService.retrieveRecommendedReels(key, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }
}

package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.request.ReelCreationRequest;
import com.anonymous.streaming_platform.dto.request.StreamCreationRequest;
import com.anonymous.streaming_platform.dto.response.*;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.StreamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping(StreamController.STREAM_URL)
@RequiredArgsConstructor
public class StreamController {

    public static final String STREAM_URL = "api/v1";
    private final StreamService streamService;

    @GetMapping("/users/{username}/streams/live")
    public ApiResponse<StreamResponse> retrieveLiveStream(
            @PathVariable("username") String username
    ) {
        log.info("Received request to retrieve live stream for username {}.", username);
        StreamResponse response = streamService.retrieveLiveStream(username);
        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("streams/followed")
    public ApiResponse<ListStreamResponse> retrieveFollowedStreams(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("status") int status,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        log.info("Received request to retrieve followed streams with key {} and status {}.", key, status);
        int normalStatus = status != 0 && status != 1 ? 1 : status;
        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        ListStreamResponse response = streamService.retrieveFollowedStreams(key, normalStatus, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("streams/outstanding")
    public ApiResponse<ListStreamOsdResponse> retrieveOutstandingStreams(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {

        log.info("Received request to retrieve outstanding streams with page {} and size {}.", page, size);
        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 1;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        ListStreamOsdResponse response = streamService.retrieveOutstandingStreams(pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }


    @GetMapping("streams/recommended")
    public ApiResponse<ListStreamRcmResponse> retrieveRecommendedStreams(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("status") int status,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {

        log.info("Received request to retrieve recommended streams with page {} and size {}.", page, size);
        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 1;
        int normalStatus = status != 0 && status != 1 ? 1 : status;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        ListStreamRcmResponse response = streamService.retrieveRecommendedStreams(key, normalStatus, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/streams/{id}")
    public ApiResponse<StreamResponse> retrieveStream(@PathVariable("id") String id) {
        log.info("Received request to retrieve stream with id {}.", id);
        StreamResponse response = streamService.retrieveStream(id);
        return ApiResponse.getSuccessResponse(response);
    }


    @GetMapping("categories/{id}/streams")
    public ApiResponse<ListStreamRcmResponse> retrieveStreamsByCategory(
            @PathVariable("id") Long categoryId,
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        log.info("Received request to retrieve my streams with page {} and size {}.", page, size);
        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        ListStreamRcmResponse response = streamService.retrieveStreamsByCategory(categoryId, key, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @PostMapping("/streams")
    public ApiResponse<StreamCreationResponse> createStream(
            @RequestPart("stream") StreamCreationRequest request,
            @RequestPart("thumbnail") MultipartFile thumbnail
    ) {

        log.info("Received request to create stream: {}", request);
        var response = streamService.createStream(request, thumbnail);

        return ApiResponse.getSuccessResponse(response);
    }

}

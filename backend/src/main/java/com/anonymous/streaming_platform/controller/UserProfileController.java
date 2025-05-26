package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.request.ChangePasswordRequest;
import com.anonymous.streaming_platform.dto.request.EditProfileRequest;
import com.anonymous.streaming_platform.dto.response.ListReelRcmResponse;
import com.anonymous.streaming_platform.dto.response.ListStreamRcmResponse;
import com.anonymous.streaming_platform.dto.response.UserProfileResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.ReelService;
import com.anonymous.streaming_platform.service.StreamService;
import com.anonymous.streaming_platform.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RestController
@RequestMapping(UserProfileController.USER_URL)
@RequiredArgsConstructor
public class UserProfileController {

    public static final String USER_URL = "api/v1/users";

    private final UserProfileService userProfileService;
    private final StreamService streamService;
    private final ReelService reelService;

    @GetMapping("/{username}/profile")
    public ApiResponse<UserProfileResponse> retrieveUserProfile(@PathVariable String username) {

        log.info("Received request to retrieve user profile for username {}.", username);

        UserProfileResponse response = userProfileService.retrieveUserProfile(username);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/me/profile")
    public ApiResponse<UserProfileResponse> retrieveMyProfile() {

        log.info("Received request to retrieve my profile.");

        UserProfileResponse response = userProfileService.retrieveMyProfile();

        return ApiResponse.getSuccessResponse(response);
    }

    @PutMapping(value = "/me/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<UserProfileResponse> editUserProfile(
            @RequestPart("profile") @Valid  EditProfileRequest request,
            @RequestPart(value = "avatar", required = false) MultipartFile avatar) {
        log.info("Received request to edit user profile: {}", request);

        UserProfileResponse response = userProfileService.editUserProfile(request, avatar);

        return ApiResponse.getSuccessResponse(response);
    }

    @PutMapping("/me/password")
    public ApiResponse<UserProfileResponse> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        log.info("Received request to change password: {}", request);

        UserProfileResponse response = userProfileService.changePassword(request);

        return ApiResponse.getSuccessResponse(response);
    }


    @GetMapping("/{username}/streams")
    public ApiResponse<ListStreamRcmResponse> retrieveMyStreams(
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @PathVariable("username") String username
    ) {
        log.info("Received request to retrieve my streams with page {} and size {}.", page, size);

        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);

        var response = streamService.retrieveMyStreams(username, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }


    @GetMapping("/{username}/reels")
    public ApiResponse<ListReelRcmResponse> retrieveMyReels(
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @PathVariable("username") String username
    ) {
        log.info("Received request to retrieve my reels with page {} and size {}.", page, size);

        int normalPage = Math.max(page, 0);
        int normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);

        var response = reelService.retrieveMyReels(username, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

}

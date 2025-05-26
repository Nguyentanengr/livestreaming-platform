package com.anonymous.streaming_platform.controller;

import com.anonymous.streaming_platform.dto.request.CommentCreationRequest;
import com.anonymous.streaming_platform.dto.response.CommentCreationResponse;
import com.anonymous.streaming_platform.dto.response.ListCommentBasicResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(CommentController.COMMENT_URL)
@RequiredArgsConstructor
public class CommentController {

    public static final String COMMENT_URL = "api/v1/reels";

    private final CommentService commentService;

    @PostMapping("/{id}/comments")
    public ApiResponse<CommentCreationResponse> createComment(
            @PathVariable("id") String id,
            @RequestBody @Valid CommentCreationRequest request
    ) {
        log.info("Received request to create comment.");

        var response = commentService.createComment(request, id);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/{id}/comments")
    public ApiResponse<ListCommentBasicResponse> retrieveComments(
            @PathVariable("id") String reelId,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {
        log.info("Received request to retrieve comments.");

        var normalPage = Math.max(page, 0);
        var normalSize = 0 < size && size <= 100 ? size : 10;

        PageRequest pageRequest = PageRequest.of(normalPage, normalSize);
        var response = commentService.retrieveComments(reelId, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }


    @DeleteMapping("/{reelId}/comments/{commentId}")
    public ApiResponse<Void> deleteComment(
            @PathVariable("reelId") String reelId,
            @PathVariable("commentId") String commentId
    ) {
        log.info("Received request to delete comment.");

        commentService.deleteComment(reelId, commentId);
        return ApiResponse.getSuccessResponse(null);
    }


    @PostMapping("/{reelId}/comments/{commentId}/like")
    public ApiResponse<Void> likeComment(
            @PathVariable("reelId") String reelId,
            @PathVariable("commentId") String commentId
    ) {
        log.info("Received request to like comment.");

        commentService.likeComment(commentId);
        return ApiResponse.getSuccessResponse(null);
    }

    @DeleteMapping("/{reelId}/comments/{commentId}/unlike")
    public ApiResponse<Void> unlikeComment(
            @PathVariable("reelId") String reelId,
            @PathVariable("commentId") String commentId
    ) {
        log.info("Received request to unlike comment.");

        commentService.unlikeComment(commentId);
        return ApiResponse.getSuccessResponse(null);
    }
}

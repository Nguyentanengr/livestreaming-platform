package com.anonymous.streaming_platform.dto.response;


import lombok.Builder;

import java.util.List;

@Builder
public record ListCommentBasicResponse(
        List<CommentBasicResponse> comments,
        Integer currentPage,
        Integer totalPages
) {
}

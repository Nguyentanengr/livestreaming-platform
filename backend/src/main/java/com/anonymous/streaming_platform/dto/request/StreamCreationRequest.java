package com.anonymous.streaming_platform.dto.request;

import com.anonymous.streaming_platform.constant.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record StreamCreationRequest(

        @NotNull(message = "USER_SESSION_NOT_NULL")
        String userSessionId,

        @NotNull(message = "STREAM_TITLE_BLANK")
        @NotBlank(message = "STREAM_TITLE_BLANK")
        String title,
        String liveNotification,

        @NotNull(message = "CATEGORY_NOT_PROVIDED")
        Long categoryId,

        @NotNull(message = "TAG_NAME_EMPTY")
        @NotEmpty(message = "TAG_NAME_EMPTY")
        List<String> tagNames,

        @NotNull(message = "COMMENT_ENABLE_BLANK")
        Boolean commentEnabled,

        @NotNull(message = "VISIBILITY_BLANK")
        Visibility visibility
) {
}

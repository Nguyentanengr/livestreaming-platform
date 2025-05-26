package com.anonymous.streaming_platform.dto.request;

import com.anonymous.streaming_platform.constant.Visibility;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ReelCreationRequest (

        String description,
        List<String> tagNames,

        @NotNull(message = "VISIBILITY_BLANK")
        Visibility visibility,

        @NotNull(message = "COMMENT_ENABLED_BLANK")
        Boolean commentEnabled
) {
}

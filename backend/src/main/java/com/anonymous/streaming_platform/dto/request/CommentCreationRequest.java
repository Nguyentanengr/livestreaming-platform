package com.anonymous.streaming_platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

@Builder
public record CommentCreationRequest(

        @NotBlank(message = "COMMENT_BLANK")
        @Length(max = 255, message = "COMMENT_INVALID_SIZE")
        String content
) {
}

package com.anonymous.streaming_platform.dto.response;

import lombok.Builder;

@Builder
public record UserSummaryResponse(
        Integer id,
        String username,
        String avatar
) {}

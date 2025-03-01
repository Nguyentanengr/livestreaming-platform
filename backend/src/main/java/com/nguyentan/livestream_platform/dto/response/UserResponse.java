package com.nguyentan.livestream_platform.dto.response;

import com.nguyentan.livestream_platform.constant.UserStatusEnum;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserResponse(

        UUID id,
        String username,
        String email,
        String googleId,
        String thumbnail,
        String bio,
        UserStatusEnum status,
        LocalDateTime lastLogin,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Boolean isActive
) {}
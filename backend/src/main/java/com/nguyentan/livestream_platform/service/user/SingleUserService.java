package com.nguyentan.livestream_platform.service.user;

import com.nguyentan.livestream_platform.dto.response.UserResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SingleUserService {

    private final UserRepository userRepository;

    public Object findUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found by email"));

        UserResponse response = UserResponse.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .googleId(user.getGoogleId())
                .thumbnail(user.getThumbnail())
                .lastLogin(user.getLastLogin())
                .status(user.getStatus())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .isActive(user.getIsActive())
                .build();

        return response;
    }

    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

}

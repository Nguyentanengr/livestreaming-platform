package com.nguyentan.livestream_platform.service.user;

import com.nguyentan.livestream_platform.dto.response.UserResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SingleUserService implements UserDetailsService {

    private final UserRepository userRepository;

    // This method only use when authenticate
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by email"));
    }


    public UserResponse findUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found by email"));

        return UserResponse.builder()
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
    }

    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}

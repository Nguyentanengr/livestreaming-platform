package com.nguyentan.livestream_platform.service.user;

import com.nguyentan.livestream_platform.dto.response.UserResponse;
import com.nguyentan.livestream_platform.entity.User;
import com.nguyentan.livestream_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

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

    public Optional<String> getNicknameByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        String nickname = user.map(User::getNickname).orElse(null);

        return Optional.ofNullable(nickname);
    }


}

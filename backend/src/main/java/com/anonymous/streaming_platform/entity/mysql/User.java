package com.anonymous.streaming_platform.entity.mysql;

import com.anonymous.streaming_platform.constant.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Transient;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 20)
    private String username;

    @Column(unique = true, nullable = false, length = 50)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String avatar;

    @Column(length = 1000)
    private String bio;

    @Column(name = "followers_count", nullable = false)
    private Integer followersCount;

    @Column(name = "streams_count", nullable = false)
    private Integer streamsCount;

    @Column(name = "reels_count", nullable = false)
    private Integer reelsCount;

    @Column(name = "is_streaming", nullable = false)
    private Boolean isStreaming;

    @Column(name = "logon_at")
    private LocalDateTime logonAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.EAGER)
    private Link link;

    // Hữu ích với session-base authentication vì khi DoFilterExternal
    // Hệ thống phân quyền dựa trên sessionId và tìm ra user tương ứng
    // GetAuthories sẽ cung cấp các thông tin chuẩn hóa về Role, hệ
    // thống sẽ cập nhật thông tin này vào AuthContext Giúp Spring tự
    // động phân quyền vào ứng dụng
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isEnabled() {
        return status == UserStatus.ACTIVE;
    }

    @PrePersist // Thực thi trước khi lưu mới đối tượng vào database
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.followersCount = 0;
        this.streamsCount = 0;
        this.reelsCount = 0;
        this.isStreaming = false;
        this.status = UserStatus.ACTIVE;
    }
}

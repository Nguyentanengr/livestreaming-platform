package com.nguyentan.livestream_platform.entity;

import com.nguyentan.livestream_platform.constant.UserStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column(length = 100)
    private String password;

    @Column(name = "google_id", unique = true)
    private String googleId;

    @Column(nullable = false)
    private String thumbnail;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = false)
    private UserStatusEnum status;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<SocialLink> socialLinks = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.thumbnail = this.thumbnail == null ? "/default/thumbnail" : this.thumbnail;
        this.status = UserStatusEnum.OFFLINE;
        this.createdAt = this.updatedAt = LocalDateTime.now();
        this.isActive = true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", googleId='" + googleId + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", bio='" + bio + '\'' +
                ", status=" + status +
                ", lastLogin=" + lastLogin +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", isActive=" + isActive +
                ", role=" + role +
                ", socialLinks=" + socialLinks +
                '}';
    }
}

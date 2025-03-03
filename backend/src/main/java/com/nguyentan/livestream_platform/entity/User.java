package com.nguyentan.livestream_platform.entity;

import com.nguyentan.livestream_platform.constant.UserStatusEnum;
import com.nguyentan.livestream_platform.service.user.UserNicknameGenerator;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
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
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String nickname;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<SocialLink> socialLinks = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_category",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();


    @PrePersist
    protected void onCreate() {
        if (this.nickname == null) this.nickname = UserNicknameGenerator.getUniqueUserNickname();
        this.thumbnail = this.thumbnail == null ? "/default/thumbnail" : this.thumbnail;
        this.status = UserStatusEnum.OFFLINE;
        this.createdAt = this.updatedAt = LocalDateTime.now();
        this.isActive = true;
    }


    public void addSocialLink(SocialLink socialLink) {
        this.socialLinks.add(socialLink);
        socialLink.setUser(this);
    }

    public void removeSocialLink(SocialLink socialLink) {
        this.socialLinks.remove(socialLink);
        socialLink.setUser(null);
    }

    public void addCategory(Category category) {
        this.getCategories().add(category);
    }

    public void removerCategory(Category category) {
        this.getCategories().remove(category);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + nickname + '\'' +
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

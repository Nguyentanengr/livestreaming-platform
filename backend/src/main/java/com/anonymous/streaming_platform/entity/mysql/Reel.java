package com.anonymous.streaming_platform.entity.mysql;

import com.anonymous.streaming_platform.constant.Visibility;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.Transient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reels")
public class Reel {


    @Id
    @Column(length = 20)
    private String id;

    private String description;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String video;

    @Column(name = "likes_count", nullable = false)
    private Integer likesCount;

    @Column(name = "comments_count", nullable = false)
    private Integer commentsCount;

    @Column(name = "views_count", nullable = false)
    private Integer viewsCount;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @Column(name = "comment_enabled", nullable = false)
    private Boolean commentEnabled;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany
    @JoinTable(
            name = "reel_tags",
            joinColumns = @JoinColumn(name = "reel_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;


    @PrePersist
    private void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.likesCount = 0;
        this.commentsCount = 0;
        this.viewsCount = 0;
        this.deletedAt = null;
    }
}

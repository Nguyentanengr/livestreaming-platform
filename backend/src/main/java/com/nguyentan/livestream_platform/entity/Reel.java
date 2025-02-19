package com.nguyentan.livestream_platform.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nguyentan.livestream_platform.constant.CommentSettingEnum;
import com.nguyentan.livestream_platform.constant.VisibilityEnum;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reel")
public class Reel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private VisibilityEnum visibility;

    @Column(name = "comment_setting", nullable = false)
    private CommentSettingEnum commentSetting;

    @Column(unique = true)
    private String url;

    @Column(name = "like_count")
    private Integer likeCount;

    @Column(name = "share_count")
    private Integer shareCount;

    @Column(name = "comment_count")
    private Integer commentCount;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "reel", cascade = CascadeType.ALL)
    private Set<ReelTag> reelTags;

    @JsonManagedReference
    @OneToMany(mappedBy = "reel", cascade = CascadeType.ALL)
    private Set<Comment> comments;


    @PrePersist
    private void onCreate() {
        if (this.visibility == null) {
            this.visibility = VisibilityEnum.ALL;
        }
        if (this.commentSetting == null) {
            this.commentSetting = CommentSettingEnum.ON;
        }
        this.likeCount = this.commentCount = this.shareCount = 0;
        this.isActive = true;
    }

    @Override
    public String toString() {
        return "Reel{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", visibility=" + visibility +
                ", commentSetting=" + commentSetting +
                ", url='" + url + '\'' +
                ", likeCount=" + likeCount +
                ", shareCount=" + shareCount +
                ", commentCount=" + commentCount +
                ", createdAt=" + createdAt +
                ", isActive=" + isActive +
                ", user=" + user +
                '}';
    }
}

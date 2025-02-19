package com.nguyentan.livestream_platform.entity;


import com.nguyentan.livestream_platform.constant.CommentSettingEnum;
import com.nguyentan.livestream_platform.constant.VisibilityEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reel")
public class Reel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "thumbnail", length = 255, nullable = false)
    private String thumbnail;

    @Column(name = "visibility", nullable = false)
    private VisibilityEnum visibility;

    @Column(name = "comment_setting", nullable = false)
    private CommentSettingEnum commentSetting;

    @Column(name = "url", unique = true)
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

    @Column(name = "user_id", nullable = false)
    private UUID userId;

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
                ", userId=" + userId +
                '}';
    }
}

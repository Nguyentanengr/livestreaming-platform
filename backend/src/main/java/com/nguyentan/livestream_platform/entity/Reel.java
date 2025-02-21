package com.nguyentan.livestream_platform.entity;


import com.nguyentan.livestream_platform.constant.CommentSettingEnum;
import com.nguyentan.livestream_platform.constant.VisibilityEnum;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "reel", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<ReelTag> reelTags = new HashSet<>();

    @OneToMany(mappedBy = "reel", cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<>();


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

    public void addReelTag(ReelTag reelTag) {
        this.getReelTags().add(reelTag);
        reelTag.setReel(this);
    }

    public void removeReelTag(ReelTag reelTag) {
        this.getReelTags().remove(reelTag);
        reelTag.setReel(null);
    }

    public void addComment(Comment comment) {
        this.getComments().add(comment);
        comment.setReel(this);
    }

    public void removeComment(Comment comment) {
        this.getComments().remove(comment);
        comment.setReel(null);
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

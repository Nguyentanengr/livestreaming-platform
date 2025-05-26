package com.anonymous.streaming_platform.entity.mysql;

import com.anonymous.streaming_platform.constant.Visibility;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "streams")
public class Stream {

    @Id
    @Column(length = 20)
    private String id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(name = "live_notification")
    private String liveNotification;

    @Column(nullable = false)
    private String thumbnail;

    private String video;

    @Column(name = "peak_viewers", nullable = false)
    private Integer peakViewers;

    @Column(name = "viewers_count", nullable = false)
    private Integer viewersCount;

    @Column(name = "total_viewers", nullable = false)
    private Integer totalViewers;

    @Column(name = "comment_enabled", nullable = false)
    private boolean commentEnabled;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "stream_tags",
            joinColumns = @JoinColumn(name = "stream_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;


    @Override
    public String toString() {
        return "Stream{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", liveNotification='" + liveNotification + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", video='" + video + '\'' +
                ", peakViewers=" + peakViewers +
                ", viewersCount=" + viewersCount +
                ", totalViewers=" + totalViewers +
                ", commentEnabled=" + commentEnabled +
                ", visibility=" + visibility +
                ", startedAt=" + startedAt +
                ", endedAt=" + endedAt +
                ", deletedAt=" + deletedAt +
                '}';
    }
}

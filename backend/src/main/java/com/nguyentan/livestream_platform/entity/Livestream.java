package com.nguyentan.livestream_platform.entity;


import com.nguyentan.livestream_platform.constant.ChatSettingEnum;
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
@Table(name = "livestream")
public class Livestream {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String liveNotification;

    @Column(nullable = false)
    private String thumbnail;

    @Column(unique = true)
    private String url;

    @Column(name = "chat_setting", nullable = false)
    private ChatSettingEnum chatSetting;

    @Column(nullable = false)
    private VisibilityEnum visibility;

    @CreationTimestamp
    @Column(name = "start_time", nullable = false, updatable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "peak_viewer")
    private Integer peakViewer;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<LivestreamTag> livestreamTags = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<Viewer> viewers = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<Chat> chats = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<ActivityFeed> activityFeeds = new HashSet<>();

    @Override
    public String toString() {
        return "Livestream{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", liveNotification='" + liveNotification + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", url='" + url + '\'' +
                ", chatSetting=" + chatSetting +
                ", visibility=" + visibility +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", peakView=" + peakViewer +
                ", isActive=" + isActive +
                ", user=" + user +
                ", category=" + category +
                ", livestreamTags=" + livestreamTags +
                '}';
    }
}

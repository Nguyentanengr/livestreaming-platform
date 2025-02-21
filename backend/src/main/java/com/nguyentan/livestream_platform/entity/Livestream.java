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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<LivestreamTag> livestreamTags = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<Viewer> viewers = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<Chat> chats = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<ActivityFeed> activityFeeds = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<BlockedChat> blockedChats = new HashSet<>();

    @OneToMany(mappedBy = "livestream", cascade = CascadeType.ALL)
    private Set<BlockedViewer> blockedViewers = new HashSet<>();

    public void addLivestreamTag(LivestreamTag tag) {
        this.livestreamTags.add(tag);
        tag.setLivestream(this);
    }

    public void removeLivestreamTag(LivestreamTag tag) {
        this.livestreamTags.remove(tag);
        tag.setLivestream(null);
    }


    public void addViewer(Viewer viewer) {
        this.viewers.add(viewer);
        viewer.setLivestream(this);
    }

    public void removeViewer(Viewer viewer) {
        this.viewers.remove(viewer);
        viewer.setLivestream(null);
    }

    public void addChat(Chat chat) {
        this.chats.add(chat);
        chat.setLivestream(this);
    }

    public void removeChat(Chat chat) {
        this.chats.remove(chat);
        chat.setLivestream(null);
    }

    public void addActivityFeed(ActivityFeed activityFeed) {
        this.activityFeeds.add(activityFeed);
        activityFeed.setLivestream(this);
    }

    public void removeActivityFeed(ActivityFeed activityFeed) {
        this.activityFeeds.remove(activityFeed);
        activityFeed.setLivestream(null);
    }

    public void addBlockedChat(BlockedChat blockedChat) {
        this.blockedChats.add(blockedChat);
        blockedChat.setLivestream(this);
    }

    public void removeBlockedChat(BlockedChat blockedChat) {
        this.blockedChats.remove(blockedChat);
        blockedChat.setLivestream(null);
    }

    public void addBlockedViewer(BlockedViewer blockedViewer) {
        this.blockedViewers.add(blockedViewer);
        blockedViewer.setLivestream(this);
    }

    public void removeBlockedViewer(BlockedViewer blockedViewer) {
        this.blockedViewers.remove(blockedViewer);
        blockedViewer.setLivestream(null);
    }



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

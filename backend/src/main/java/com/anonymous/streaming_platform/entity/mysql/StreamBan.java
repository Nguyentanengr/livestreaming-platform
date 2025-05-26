package com.anonymous.streaming_platform.entity.mysql;


import com.anonymous.streaming_platform.constant.BanType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stream_bans")
public class StreamBan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "ban_type", nullable = false)
    private BanType banType;

    @Column(nullable = false, length = 100)
    private String reason;

    @Column(name = "banned_at", nullable = false)
    private LocalDateTime bannedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "viewer_id", nullable = false)
    private User viewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "streamer_id", nullable = false)
    private User streamer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stream_id", nullable = false)
    private Stream stream;

}

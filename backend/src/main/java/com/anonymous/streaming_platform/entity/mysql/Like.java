package com.anonymous.streaming_platform.entity.mysql;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "likes")
public class Like {

    @EmbeddedId
    private LikeId id;

    @MapsId("reelId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reel_id", nullable = false)
    private Reel reel;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}

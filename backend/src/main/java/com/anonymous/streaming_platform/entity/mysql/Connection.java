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
@Table(name = "connections")
public class Connection {

    @EmbeddedId
    private ConnectionId id;

    @MapsId("followingId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_id", nullable = false)
    private User following;

    @MapsId("followerId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @Column(name = "followed_at", nullable = false, updatable = false)
    private LocalDateTime followedAt;

}

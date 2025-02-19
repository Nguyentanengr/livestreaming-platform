package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "connection")
public class Connection {

    @EmbeddedId
    private ConnectionId id;

    @ManyToOne
    @MapsId("followingId")
    @JoinColumn(name = "following_id", nullable = false)
    private User following;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @CreationTimestamp
    @Column(name = "following_at", nullable = false, updatable = false)
    private LocalDateTime followingAt;

    @Override
    public String toString() {
        return "Connection{" +
                "id=" + id +
                ", following=" + following +
                ", follower=" + follower +
                ", followingAt=" + followingAt +
                '}';
    }
}



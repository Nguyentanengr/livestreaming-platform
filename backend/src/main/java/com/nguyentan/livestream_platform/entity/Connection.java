package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "connection")
public class Connection {

    @CreationTimestamp
    @Column(name = "following_at", nullable = false, updatable = false)
    private LocalDateTime followingAt;

    @Id
    @Column(name = "following_id")
    private UUID followingId;

    @Id
    @Column(name = "follower_id")
    private UUID followerId;

    @Override
    public String toString() {
        return "Connection{" +
                "followingAt=" + followingAt +
                ", following=" + followingId +
                ", follower=" + followerId +
                '}';
    }
}



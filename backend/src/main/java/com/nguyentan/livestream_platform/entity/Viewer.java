package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "viewer")
public class Viewer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    @Column(name = "join_time", nullable = false, updatable = false)
    private LocalDateTime joinTime;

    @Column(name = "leave_time", updatable = false)
    private LocalDateTime leaveTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "livestream_id", nullable = false)
    private Livestream livestream;

    @Override
    public String toString() {
        return "Viewer{" +
                "id=" + id +
                ", joinTime=" + joinTime +
                ", leaveTime=" + leaveTime +
                ", user=" + user +
                ", livestream=" + livestream +
                '}';
    }
}

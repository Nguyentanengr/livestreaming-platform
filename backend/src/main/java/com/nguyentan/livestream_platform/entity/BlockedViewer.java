package com.nguyentan.livestream_platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blocked_chat")
public class BlockedViewer {

    @EmbeddedId
    private BlockedViewerId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("livestreamId")
    @JoinColumn(name = "livestream_id", nullable = false)
    private Livestream livestream;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @CreationTimestamp
    @Column(name = "block_time", nullable = false, updatable = false)
    private LocalDateTime blockTime;

    @Override
    public String toString() {
        return "BlockedChat{" +
                "id=" + id +
                ", user=" + user +
                ", livestream=" + livestream +
                ", reason='" + reason + '\'' +
                ", blockTime=" + blockTime +
                '}';
    }
}

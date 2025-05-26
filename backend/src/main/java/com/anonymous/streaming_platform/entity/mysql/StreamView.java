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
@Table(name = "stream_views")
public class StreamView {

    @EmbeddedId
    private StreamViewId id;

    @MapsId("streamId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stream_id", nullable = false)
    private Stream stream;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "left_at")
    private LocalDateTime leftAt;

}

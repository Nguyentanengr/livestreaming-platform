package com.nguyentan.livestream_platform.entity;


import com.nguyentan.livestream_platform.constant.NotiTypeEnum;
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
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private NotiTypeEnum type;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @Column(name = "is_read", nullable = false)
    private Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    private void onCreate() {
        this.isRead = false;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", type=" + type +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", isRead=" + isRead +
                ", user=" + user +
                '}';
    }
}

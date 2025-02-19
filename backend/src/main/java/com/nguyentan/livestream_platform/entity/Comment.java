package com.nguyentan.livestream_platform.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @Column(name = "like_count")
    private Integer likeCount;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "reel_id", nullable = false)
    private Reel reel;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id" ,nullable = false)
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "reply_id")
    private Comment reply;

    @JsonManagedReference
    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL)
    private java.util.List<Comment> replies;

    @PrePersist
    protected void onCreate() {
        this.likeCount = 0;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", likeCount=" + likeCount +
                ", reel=" + reel +
                ", user=" + user +
                ", reply=" + reply +
                ", replies=" + replies +
                '}';
    }
}

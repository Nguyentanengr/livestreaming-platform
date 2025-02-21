package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
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
    @JoinColumn(name = "reel_id", nullable = false)
    private Reel reel;

    @ManyToOne
    @JoinColumn(name = "user_id" ,nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_id")
    private Comment reply;

    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL)
    private Set<Comment> replies = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.likeCount = 0;
    }

    public void addReply(Comment comment) {
        this.getReplies().add(comment);
        comment.setReply(comment);
    }

    public void removeReply(Comment comment) {
        this.getReplies().remove(comment);
        comment.setReply(null);
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

package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reel_tag", uniqueConstraints =
        {
                @UniqueConstraint(columnNames = {"reel_id", "tag_name"})
        }
)
public class ReelTag {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "reel_id", nullable = false)
    private Reel reel;

    @Column(name = "tag_name", nullable = false)
    private String tagName;

    @Override
    public String toString() {
        return "ReelTag{" +
                "reel=" + reel +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}

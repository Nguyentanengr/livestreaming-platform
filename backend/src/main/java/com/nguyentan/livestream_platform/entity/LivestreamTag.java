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
@Table(name = "livestream_tag", uniqueConstraints =
        {
                @UniqueConstraint(columnNames = {"livestream_id", "tag_name"})
        }
)
public class LivestreamTag {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "livestream_id", nullable = false)
    private Livestream livestream;

    @Column(name = "tag_name", nullable = false)
    private String tagName;

    @Override
    public String toString() {
        return "LivestreamTag{" +
                "id=" + id +
                ", livestream=" + livestream +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}

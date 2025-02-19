package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reel_tag")
public class ReelTag {

    @EmbeddedId
    private ReelTagId id;

    @ManyToOne
    @MapsId("reelId")
    @JoinColumn(name = "reel_id", nullable = false)
    private Reel reel;

    @MapsId("tagName")
    @Column(name = "tag_name")
    private String tagName;

    @Override
    public String toString() {
        return "ReelTag{" +
                "id=" + id +
                ", reel=" + reel +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}

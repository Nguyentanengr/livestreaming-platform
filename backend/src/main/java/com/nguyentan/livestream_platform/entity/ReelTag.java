package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reel_tag")
public class ReelTag {

    @Id
    @Column(name = "reel_id")
    private UUID reelId;

    @Id
    @Column(name = "tag_name", length = 255)
    private String tagName;

    @Override
    public String toString() {
        return "ReelTag{" +
                "reelId=" + reelId +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}

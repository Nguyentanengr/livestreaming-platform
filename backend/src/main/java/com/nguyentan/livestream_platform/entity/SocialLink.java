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
@Table(name = "social_link")
public class SocialLink {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String platform;

    @Column(nullable = false, unique = true)
    private String url;

    @Override
    public String toString() {
        return "SocialLink{" +
                "id=" + id +
                ", platform='" + platform + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}

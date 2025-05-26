package com.anonymous.streaming_platform.entity.mysql;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 20)
    private String name;

    @Column(nullable = false)
    private String thumbnail;

    @Column(name = "interested_count", nullable = false)
    private Integer interestedCount;

    @Column(length = 2000)
    private String description;

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", interestedCount=" + interestedCount +
                '}';
    }
}

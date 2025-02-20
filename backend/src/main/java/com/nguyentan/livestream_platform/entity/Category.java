package com.nguyentan.livestream_platform.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String thumbnail;

    @Column(name = "interested_count")
    private Integer interestedCount;

    @ManyToMany(mappedBy = "categories")
    private Set<User> users = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.interestedCount = 0;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", interestedCount=" + interestedCount +
                '}';
    }
}

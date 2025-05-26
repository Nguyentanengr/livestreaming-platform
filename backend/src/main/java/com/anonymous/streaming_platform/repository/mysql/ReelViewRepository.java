package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReelViewRepository extends JpaRepository<Category, Long> {
}

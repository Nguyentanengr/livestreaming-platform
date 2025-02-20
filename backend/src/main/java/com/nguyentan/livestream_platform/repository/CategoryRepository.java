package com.nguyentan.livestream_platform.repository;

import com.nguyentan.livestream_platform.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
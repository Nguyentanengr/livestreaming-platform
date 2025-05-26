package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c " +
            "WHERE :key IS NULL OR :key = '' OR c.name LIKE CONCAT('%', :key, '%')")
    Page<Category> findAllWithKey(@Param("key") String key, Pageable pageable);


    @Query("SELECT c FROM Category c " +
            "LEFT JOIN UserCategory uc ON c.id = uc.id.categoryId " +
            "WHERE :key IS NULL OR :key = '' OR c.name LIKE CONCAT('%', :key, '%') " +
            "GROUP BY c " +
            "ORDER BY COUNT(CASE WHEN uc.interestedAt >= :startOfMonth " +
            "AND uc.interestedAt < :startOfNextMonth THEN 1 ELSE NULL END) DESC")
    Page<Category> findRcmCategories(
            @Param("key") String key,
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("startOfNextMonth") LocalDateTime startOfNextMonth,
            Pageable pageable
    );


    @Query("SELECT c FROM Category c " +
            "JOIN UserCategory uc ON uc.id.categoryId = c.id " +
            "WHERE :key IS NULL OR :key = '' OR c.name LIKE CONCAT('%', :key, '%') " +
            "AND uc.id.userId = :userId " +
            "ORDER BY uc.interestedAt DESC")
    Page<Category> findInterestedCategoriesByUserId(
            @Param("key") String key,
            @Param("userId") Long userId,
            Pageable pageable
    );



}

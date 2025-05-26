package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Reel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ReelRepository extends JpaRepository<Reel, String> {

    @Query("SELECT r FROM Reel r " +
            "LEFT JOIN FETCH r.user u " +
            "LEFT JOIN FETCH r.tags t " +
            "WHERE (:key IS NULL OR :key = '' OR :key IN (SELECT t.name FROM r.tags t) " +
            "OR r.description LIKE CONCAT('%', :key, '%')) " +
            "AND YEAR(r.createdAt) = :currentYear " +
            "AND r.deletedAt IS NULL " +
            "AND (r.visibility = 'PUBLIC' OR " +
            "(r.visibility = 'FOLLOWERS' AND EXISTS " +
            "(SELECT 1 FROM Connection c WHERE c.follower.id = :userId AND c.following.id = u.id))) " +
            "ORDER BY (r.likesCount + 1.0 / (r.viewsCount + 1)) DESC, r.commentsCount DESC")
    Page<Reel> findRecommendedReelWithKeyAndVisibility(
            @Param("userId") Long userId,
            @Param("key") String key,
            @Param("currentYear") int currentYear,
            Pageable pageable
    );


    @Query("SELECT r FROM Reel r " +
            "WHERE r.id = :reelId " +
            "AND r.deletedAt IS NULL " +
            "AND (r.visibility = 'PUBLIC' " +
            "OR (r.visibility = 'FOLLOWERS' AND EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.follower.id = :userId AND c.following.id = r.user.id))) ")
    Optional<Reel> findVisibleReelById(
            @Param("userId") Long userId,
            @Param("reelId") String reelId
    );



    @Query("SELECT r FROM Reel r " +
            "LEFT JOIN FETCH r.user u " +
            "LEFT JOIN FETCH r.tags t " +
            "WHERE r.deletedAt IS NULL " +
            "AND r.user.id = :userId " +
            "AND ( " +
            "    (:currentUserId IS NULL AND r.visibility = 'PUBLIC') OR " +
            "    (:currentUserId = :userId) OR " +
            "    (:currentUserId IS NOT NULL AND :currentUserId != :userId AND " +
            "     r.visibility = 'PUBLIC') OR " +
            "    (:currentUserId IS NOT NULL AND :currentUserId != :userId AND " +
            "     r.visibility = 'FOLLOWERS' AND " +
            "     EXISTS (SELECT 1 FROM Connection c WHERE c.following.id = :userId AND c.follower.id = :currentUserId)) " +
            ") " +
            "ORDER BY r.createdAt DESC")
    Page<Reel> findAllMyStreamNotDeleted(
            @Param("currentUserId") Long currentUserId,
            @Param("userId") Long userId,
            Pageable pageable
    );
}

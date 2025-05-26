package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StreamRepository extends JpaRepository<Stream, String> {

    @Query("SELECT s FROM Stream s " +
            "LEFT JOIN FETCH s.category " +
            "LEFT JOIN FETCH s.tags " +
            "WHERE s.user.username = :username " +
            "AND s.endedAt IS NULL AND s.deletedAt IS NULL")
    List<Stream> findLiveStreamByUsernameAndNotDeleted(
            @Param("username") String username
    );

    @Query("SELECT s.user.id FROM Stream s WHERE s.id = :streamId")
    Long findStreamerIdByStreamId(
            @Param("streamId") String streamId
    );

    @Query("SELECT s FROM Stream s " +
            "JOIN FETCH s.user u " +
            "LEFT JOIN FETCH s.category " +
            "LEFT JOIN FETCH s.tags " +
            "WHERE EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.following.id = u.id AND c.follower.id = :userId) " +
            "AND (:key IS NULL OR :key = '' OR s.title LIKE CONCAT('%', :key, '%')) " +
            "AND ((:status = 0 AND s.endedAt IS NOT NULL) OR (:status = 1 AND s.endedAt IS NULL)) " +
            "AND s.visibility IN ('PUBLIC', 'FOLLOWERS') " +
            "AND s.deletedAt IS NULL " +
            "ORDER BY CASE WHEN :status = 0 THEN s.startedAt ELSE s.endedAt END DESC")
    Page<Stream> findFollowedStreamsWithStatus(
            @Param("userId") Long userId,
            @Param("status") int status,
            @Param("key") String key,
            Pageable pageable
    );

    // stream nổi bật về thể loại user quan tâm
    @Query("SELECT s FROM Stream s " +
            "LEFT JOIN FETCH s.tags " +
            "LEFT JOIN FETCH s.user " +
            "LEFT JOIN FETCH s.category " +
            "WHERE s.deletedAt IS NULL " +
            "AND s.endedAt IS NULL " +
            "AND (s.visibility = 'PUBLIC' " +
            "OR (s.visibility = 'FOLLOWERS' AND EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.following.id = s.user.id AND c.follower.id = :userId))) " +
            "ORDER BY CASE WHEN (s.category.id IN :categories) THEN 1 ELSE 0 END DESC, " +
            "(s.viewersCount / s.peakViewers + 1) DESC, s.startedAt DESC")
    Page<Stream> findOsdStreamAndNotDelete(
            @Param("userId") Long userId,
            @Param("categories") Iterable<Long> categories,
            Pageable pageable
    );

    // stream đề xuất từ những người follow
    @Query("SELECT s FROM Stream s " +
            "LEFT JOIN FETCH s.tags " +
            "LEFT JOIN FETCH s.user u " +
            "LEFT JOIN FETCH s.category " +
            "WHERE s.deletedAt IS NULL " +
            "AND ((:status = 1 AND s.endedAt IS NULL) OR (:status = 0 AND s.endedAt IS NOT NULL)) " +
            "AND (:key IS NULL OR :key = '' OR s.title LIKE CONCAT('%', :key, '%') " +
            "OR u.username LIKE CONCAT('%', :key, '%')) " +
            "AND (s.visibility = 'PUBLIC' " +
            "OR (s.visibility = 'FOLLOWERS' AND EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.following.id = s.user.id AND c.follower.id = :userId))) " +
            "ORDER BY (s.viewersCount / s.peakViewers + 1) DESC, s.startedAt DESC")
    Page<Stream> findRcmStreamAndNotDelete(
            @Param("userId") Long userId,
            @Param("categories") Iterable<Long> categories,
            @Param("key") String key,
            @Param("status") int status,
            Pageable pageable
    );


    @Query("SELECT s FROM Stream s " +
            "LEFT JOIN FETCH s.user u " +
            "LEFT JOIN FETCH s.tags t " +
            "LEFT JOIN FETCH s.category c " +
            "WHERE s.deletedAt IS NULL " +
            "AND s.user.id = :userId " +
            "AND ( " +
            "    (:currentUserId IS NULL AND s.visibility = 'PUBLIC') OR " +
            "    (:currentUserId = :userId) OR " +
            "    (:currentUserId IS NOT NULL AND :currentUserId != :userId AND " +
            "     s.visibility = 'PUBLIC') OR " +
            "    (:currentUserId IS NOT NULL AND :currentUserId != :userId AND " +
            "     s.visibility = 'FOLLOWERS' AND " +
            "     EXISTS (SELECT 1 FROM Connection c WHERE c.following.id = :userId AND c.follower.id = :currentUserId)) " +
            ") " +
            "ORDER BY s.endedAt DESC")
    Page<Stream> findAllMyStreamNotDeleted(
            @Param("currentUserId") Long currentUserId,
            @Param("userId") Long userId,
            Pageable pageable
    );


    @Query("SELECT s FROM Stream s " +
            "WHERE s.deletedAt IS NULL " +
            "AND s.id = :streamId " +
            "AND (s.visibility = 'PUBLIC' " +
            "OR (s.visibility = 'FOLLOWERS' AND EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.following.id = s.user.id AND c.follower.id = :userId))) ")
    Optional<Stream> findByIdAndNotDeleted(
            @Param("streamId") String streamId,
            @Param("userId") Long userId
    );


    @Query("SELECT s FROM Stream s " +
            "WHERE s.deletedAt IS NULL " +
            "AND s.category.id = :categoryId " +
            "AND s.endedAt IS NULL " +
            "AND s.category.name LIKE CONCAT('%', :key, '%') " +
            "AND (s.visibility = 'PUBLIC' " +
            "OR (s.visibility = 'FOLLOWERS' AND EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.following.id = s.user.id AND c.follower.id = :userId))) " +
            "ORDER BY (s.viewersCount / s.peakViewers + 1) DESC, s.startedAt DESC")
    Page<Stream> findByCategoryIdAndNotDeleted(
            @Param("categoryId") Long categoryId,
            @Param("key") String key,
            @Param("userId") Long userId,
            Pageable pageable
    );


}

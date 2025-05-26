package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Stream;
import com.anonymous.streaming_platform.entity.mysql.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);


    @Query("SELECT u FROM User u WHERE u.username = :username " +
            "AND u.deletedAt IS NULL AND u.status = 'ACTIVE'")
    Optional<User> findByUsernameAndNotDeleted(
            @Param("username") String username
    );


    @Query("SELECT u FROM User u LEFT JOIN FETCH u.link " +
            "WHERE u.username = :username AND u.deletedAt IS NULL")
    Optional<User> findWithLinksByUsernameAndNotDeleted (
            @Param("username") String username
    );

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.link " +
            "WHERE u.email = :email AND u.deletedAt IS NULL")
    Optional<User> findWithLinksByEmailAndNotDeleted(
            @Param("email") String email
    );


    @Query("SELECT COUNT(*) > 0 FROM User u " +
            "WHERE u.username = :username AND u.id != :thisId")
    Boolean existsByUsernameWithoutThis(
            @Param("username") String username,
            @Param("thisId") Long thisId
    );


    @Query("SELECT u FROM User u " +
            "WHERE EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.follower.id = :userId AND c.following.id = u.id) " +
            "AND u.status = 'ACTIVE' AND u.deletedAt IS NULL " +
            "AND (:key IS NULL OR :key = '' OR u.username LIKE CONCAT('%', :key, '%')) " +
            "ORDER BY u.isStreaming DESC, u.logonAt DESC, u.followersCount DESC")
    Page<User> findFollowedUsersWithKeyAndNotDeleted(
            @Param("userId") Long userId,
            @Param("key") String key,
            Pageable pageable
    );

    @Query("SELECT u FROM User u " +
            "WHERE (:userId IS NULL OR NOT EXISTS (SELECT 1 FROM Connection c " +
            "WHERE c.follower.id = :userId AND c.following.id = u.id) AND u.id != :userId) " +
            "AND u.status = 'ACTIVE' AND u.deletedAt IS NULL " +
            "AND (:key IS NULL OR :key = '' OR u.username LIKE CONCAT('%', :key, '%')) " +
            "ORDER BY u.isStreaming DESC, u.followersCount DESC")
    Page<User> findRecommendedWithKeyAndNotDeleted(
            @Param("userId") Long userId,
            @Param("key") String key,
            Pageable pageable
    );
}

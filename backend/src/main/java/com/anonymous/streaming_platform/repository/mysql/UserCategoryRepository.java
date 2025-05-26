package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.UserCategory;
import com.anonymous.streaming_platform.entity.mysql.UserCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCategoryRepository extends JpaRepository<UserCategory, UserCategoryId> {


    @Query("SELECT c.id FROM UserCategory uc " +
            "JOIN uc.category c " +
            "JOIN uc.user u " +
            "WHERE u.id = :userId AND c.id IN :categoryIds")
    List<Long> findInterestedInListByUserId(
            @Param("userId") Long userId,
            @Param("categoryIds") Iterable<Long> categoryIds
    );

    List<UserCategory> findByUserId(Long userId);
}

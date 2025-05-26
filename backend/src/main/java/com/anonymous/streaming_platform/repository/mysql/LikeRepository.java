package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Like;
import com.anonymous.streaming_platform.entity.mysql.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {

    @Query("SELECT l.reel.id FROM Like l " +
            "WHERE l.user.id = :userId AND l.reel.id IN :reelIds")
    List<String> findLikedByUserIdFromReelIds(
            @Param("userId") Long userId,
            @Param("reelIds") Iterable<String> reelIds
    );

}

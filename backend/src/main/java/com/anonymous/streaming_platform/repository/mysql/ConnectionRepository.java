package com.anonymous.streaming_platform.repository.mysql;

import com.anonymous.streaming_platform.entity.mysql.Connection;
import com.anonymous.streaming_platform.entity.mysql.ConnectionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ConnectionRepository extends JpaRepository<Connection, ConnectionId> {

    @Query("SELECT COUNT(*) > 0 " +
            "FROM Connection c WHERE c.id = :id")
    Boolean isConnectionExist(@Param("id") ConnectionId id);


    @Query("SELECT c.following.id " +
            "FROM Connection c " +
            "WHERE c.follower.id = :currentUserId " +
            "AND c.following.id IN :userIds")
    List<Long> findFollowedWithListUserId(
            @Param("currentUserId") Long currentUserId,
            @Param("userIds") Iterable<Long> userIds
    );

}

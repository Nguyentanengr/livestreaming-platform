package com.anonymous.streaming_platform.repository.mongodb;

import com.anonymous.streaming_platform.entity.mongodb.ActivityFeed;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityFeedRepository extends MongoRepository<ActivityFeed, String> {

    @Query("{ 'user.id':  ?0}")
    @Update("{ '$set':  {'user.username':  ?1, 'user.avatar':  ?2}}")
    void updateUserInfo(Long userId, String username, String avatar);
}

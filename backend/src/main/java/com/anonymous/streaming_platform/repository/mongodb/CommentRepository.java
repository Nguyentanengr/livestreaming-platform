package com.anonymous.streaming_platform.repository.mongodb;

import com.anonymous.streaming_platform.entity.mongodb.ActivityFeed;
import com.anonymous.streaming_platform.entity.mongodb.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

    @Query("{ 'user.id':  ?0}")
    @Update("{ '$set':  {'user.username':  ?1, 'user.avatar':  ?2}}")
    void updateUserInfo(Long userId, String username, String avatar);


    @Query(value = "{ 'reel_id':  ?0, 'deleted_at':  null }"
            , sort = "{'likes_count':  -1, 'created_at':  -1}")
    Page<Comment> findPopularComments(String reelId, Pageable pageable);

}

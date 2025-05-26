package com.anonymous.streaming_platform.repository.mongodb;

import com.anonymous.streaming_platform.entity.mongodb.ActivityFeed;
import com.anonymous.streaming_platform.entity.mongodb.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {

    Page<Notification> findAllByReceiverIdAndDeletedAtIsNullOrderByCreatedAtDesc(
            Long receiverId,
            Pageable pageable
    );

    @Query("{ 'user.id':  ?0}")
    @Update("{ '$set':  {'user.username':  ?1, 'user.avatar':  ?2}}")
    void updateUserInfo(Long userId, String username, String avatar);

    @Query("{ '_id':  { $in: ?0 }, 'is_read':  false }")
    @Update("{ '$set':  {'is_read':  true}}")
    void markAllInList(Iterable<String> ids);

    @Query("{ 'receiver_id':  ?0, 'is_read': false }")
    @Update("{ '$set':  {'is_read':  true}}")
    void markAllByUserId(Long userId);

    @Query(value = "{ 'receiver_id': ?0, 'is_read': false }", count = true)
    Integer countUnread(Long receiverId);


}

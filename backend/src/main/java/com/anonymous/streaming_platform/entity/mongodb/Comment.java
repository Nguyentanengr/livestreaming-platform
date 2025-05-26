package com.anonymous.streaming_platform.entity.mongodb;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "comments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    private String id;

    private String content;

    @Field("likes_count")
    private Integer likesCount;

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("deleted_at")
    private LocalDateTime deletedAt;

    private RelatedUser user;

    @Field("reel_id")
    private String reelId;

    @Field("liked_user_ids")
    private List<Long> likedUserIds;
}

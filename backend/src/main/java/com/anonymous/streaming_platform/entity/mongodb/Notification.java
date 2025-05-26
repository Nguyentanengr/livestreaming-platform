package com.anonymous.streaming_platform.entity.mongodb;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    private String id;

    private String type;

    private String content;

    @Field("is_read")
    private Boolean isRead = false;

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("deleted_at")
    private LocalDateTime deletedAt;

    @Field("receiver_id")
    private Long receiverId;

    private Long milestone;

    @Field("related_reel")
    private RelatedReel reel;

    @Field("related_user")
    private RelatedUser user;

}

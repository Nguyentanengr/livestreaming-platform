package com.anonymous.streaming_platform.entity.mongodb;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "activity_feeds")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityFeed {

    @Id
    private String id;

    private String type;

    private String content;

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("deleted_at")
    private LocalDateTime deletedAt;

    private RelatedUser user;

    @Field("stream_id")
    private String streamId;
}

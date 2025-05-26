package com.anonymous.streaming_platform.entity.mongodb;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelatedReel {
    @Field("_id")
    private String id;
    private String description;
    private String thumbnail;
    @Field("deleted_at")
    private String deletedAt;
}

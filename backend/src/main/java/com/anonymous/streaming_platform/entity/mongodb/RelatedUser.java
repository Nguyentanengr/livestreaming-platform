package com.anonymous.streaming_platform.entity.mongodb;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RelatedUser {
    @Field("_id")
    private Long id;
    private String username;
    private String avatar;
    @Field("deleted_at")
    private LocalDateTime deletedAt;

}

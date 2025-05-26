package com.anonymous.streaming_platform.entity.mysql;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserCategoryId implements Serializable {
    private Long userId;
    private Long categoryId;
}

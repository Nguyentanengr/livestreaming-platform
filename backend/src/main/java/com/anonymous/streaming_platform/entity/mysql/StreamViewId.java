package com.anonymous.streaming_platform.entity.mysql;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class StreamViewId implements Serializable {
    private String streamId;
    private Long userId;
}

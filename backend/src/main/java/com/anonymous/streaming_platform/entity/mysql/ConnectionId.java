package com.anonymous.streaming_platform.entity.mysql;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionId implements Serializable {

    private Long followerId; // Người đi follow
    private Long followingId; // Người được follow
}

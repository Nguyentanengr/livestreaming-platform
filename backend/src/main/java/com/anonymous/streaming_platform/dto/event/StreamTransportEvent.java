package com.anonymous.streaming_platform.dto.event;


import lombok.*;


@Builder
public record StreamTransportEvent(
        String userSessionId,
        String streamId
) {
}

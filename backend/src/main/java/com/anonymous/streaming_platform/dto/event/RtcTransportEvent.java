package com.anonymous.streaming_platform.dto.event;

import com.anonymous.streaming_platform.constant.RtcAction;
import lombok.Builder;
import org.kurento.client.IceCandidate;

@Builder
public record RtcTransportEvent(

        RtcAction action,
        String userSessionId,
        String streamId,
        String offer,
        String answer,
        IceCandidate candidate,
        String error

) {
}

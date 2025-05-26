package com.anonymous.streaming_platform.controller.websocket;


import com.anonymous.streaming_platform.constant.RtcAction;
import com.anonymous.streaming_platform.dto.event.RtcTransportEvent;
import com.anonymous.streaming_platform.dto.event.StreamTransportEvent;
import com.anonymous.streaming_platform.dto.request.StreamCreationRequest;
import com.anonymous.streaming_platform.service.WsStreamService;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WsStreamController {

    private final AuthContextProvider authContext;
    private final WsStreamService wsStreamService;

    @MessageMapping("/stream/exchange")
    public void exchange(RtcTransportEvent event) {
        log.info("Received RtcTransportEvent with action : {}", event.action());
        RtcAction action = event.action();
        switch (action) {
            case OFFER_PRESENTER, OFFER_VIEWER -> {
                wsStreamService.exchangeOffer(event);
            }
            case ICE_CANDIDATE -> {
                wsStreamService.exchangeCandidate(event);
            }
        }
    }

    @MessageMapping("/stream/join")
    public void joinLiveSession(StreamTransportEvent event) {
        log.info("Receive event to join live session: {}", event);
        wsStreamService.joinLiveSession(event);
    }

    @MessageMapping("/stream/leave")
    public void leaveLiveSession(StreamTransportEvent event) {
        log.info("Receive event to leave live session: {}", event);
        wsStreamService.leaveLiveSession(event);
    }

    @MessageMapping("/stream/end")
    public void endLiveSession(StreamTransportEvent event) {
        log.info("Receive event to end live session: {}", event);
        wsStreamService.endLiveSession(event);
    }



}

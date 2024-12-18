package com.nguyentan.livestream_platform.controller;

import com.nguyentan.livestream_platform.constant.RtcActionEnum;
import com.nguyentan.livestream_platform.dto.LiveRequestDTO;
import com.nguyentan.livestream_platform.dto.LiveTransportDTO;
import com.nguyentan.livestream_platform.dto.RtcTransportDTO;
import com.nguyentan.livestream_platform.service.LiveService;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/liveSessions")
public class LiveController {

    private final LiveService liveService;

    public LiveController(LiveService streamService) {
        this.liveService = streamService;
    }

    @GetMapping("/recommended")
    public List<LiveRequestDTO> getRecommendedLiveSessions() {
        return liveService.getRecommendedLiveSessions();
    }

    @MessageMapping("/stream/create")
    public void createLiveSession(LiveRequestDTO request) {
        log.info(request);
        liveService.createLiveSession(request);
    }

    @MessageMapping("/stream/join")
    public void joinLiveSession(LiveTransportDTO request) {
        liveService.joinLiveSession(request);
    }

    @MessageMapping("/stream/leave")
    public void leaveLiveSession(LiveTransportDTO request) {

    }

    @MessageMapping("/stream/end")
    public void endLiveSession(LiveTransportDTO request) {
        liveService.endLiveSession(request);
    }

    @MessageMapping("/stream/exchange")
    public void exchange(RtcTransportDTO request) {
        RtcActionEnum action = request.getAction();
        switch (action) {
            case OFFER_PRESENTER, OFFER_VIEWER -> {
                liveService.exchangeOffer(request);
            }
            case ICE_CANDIDATE -> {
                liveService.exchangeCandidate(request);
            }
        }
    }


}

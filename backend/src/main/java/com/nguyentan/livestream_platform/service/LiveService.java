package com.nguyentan.livestream_platform.service;


import com.nguyentan.livestream_platform.constant.RtcActionEnum;
import com.nguyentan.livestream_platform.context.LiveSession;
import com.nguyentan.livestream_platform.context.LiveSessionManager;
import com.nguyentan.livestream_platform.context.UserSession;
import com.nguyentan.livestream_platform.dto.LiveRequestDTO;
import com.nguyentan.livestream_platform.dto.LiveTransportDTO;
import com.nguyentan.livestream_platform.dto.RtcTransportDTO;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidateFoundEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Log4j2
@Service
public class LiveService {

    private final LiveSessionManager liveSessionManager;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private List<LiveRequestDTO> lives = new ArrayList<>();

    public LiveService(LiveSessionManager liveSessionManager, SimpMessagingTemplate simpMessagingTemplate) {
        this.liveSessionManager = liveSessionManager;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public synchronized void createLiveSession(LiveRequestDTO request) {

        // create live session
        LiveSession liveSession = liveSessionManager.getLiveSession();

        // Join presenter into live session and create user session
        UserSession userSession = liveSession.joinPresenter(request.getUsername());

        // Mount CandidateFoundListener into User's Endpoint
        addIceFoundListener(userSession, liveSession);

        log.info("{}-{}: Created LiveSession and UserSession"
                , liveSession.getLiveSessionId(), userSession.getUsername());

        // Save live into database
        request.setId(liveSession.getLiveSessionId());
        lives.add(request);

        // Response after completed registration
        RtcTransportDTO response = RtcTransportDTO.builder()
                .action(RtcActionEnum.PEER_PRESENTER)
                .liveSessionId(liveSession.getLiveSessionId())
                .build();
        sendMessage("/queue/" + userSession.getUsername(), response);

        log.info("{}-{}: Sending message to the client with action: PEER_PRESENTER"
                , liveSession.getLiveSessionId(), userSession.getUsername());
    }

    public synchronized void joinLiveSession(LiveTransportDTO request) {

        // Get live session
        LiveSession liveSession = liveSessionManager.getLiveSession(request.getLiveSessionId())
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        // Join viewer into live session and create user session
        UserSession userSession = liveSession.joinViewer(request.getUsername());

        // Mount CandidateFoundListener into Endpoint
        addIceFoundListener(userSession, liveSession);

        log.info("{}-{}: Created LiveSession and UserSession"
                , liveSession.getLiveSessionId(), userSession.getUsername());

        // Send to everyone else in the session about participation (chat service)

        // Response after completing registration
        RtcTransportDTO response = RtcTransportDTO.builder()
                .action(RtcActionEnum.PEER_VIEWER)
                .liveSessionId(liveSession.getLiveSessionId())
                .build();
        sendMessage("/queue/" + userSession.getUsername(), response);

        log.info("{}-{}: Sending message to the client with action: PEER_VIEWER"
                , liveSession.getLiveSessionId(), userSession.getUsername());
    }

    public synchronized void leaveLiveSession(LiveTransportDTO request) {

        // Close the userSession, Remove the user out of liveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(request.getLiveSessionId())
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        liveSession.leaveUserSession(request.getUsername());

        // Response to self after completing leave liveSession
        RtcTransportDTO response = RtcTransportDTO.builder()
                .action(RtcActionEnum.PEER_CANCEL)
                .liveSessionId(request.getLiveSessionId())
                .build();
        sendMessage("/queue/" + request.getUsername(), response);

        // Response to everyone in liveSession after completing leave liveSession (chat Service)
    }

    public synchronized void endLiveSession(LiveTransportDTO request) {
        // Update live entity on endTime

        // Close all userSession, Remove all user out of liveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(request.getLiveSessionId())
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        liveSession.leaveAllUserSession();

        // Close liveSession, Remove liveSession out of liveSessionManager
        log.info("{}: Removing liveSession out of liveSession manager", liveSession.getLiveSessionId());
        liveSessionManager.removeLiveSession(liveSession.getLiveSessionId());

        // Response after completing end liveSession
        RtcTransportDTO response = RtcTransportDTO.builder()
                .action(RtcActionEnum.PEER_CANCEL)
                .liveSessionId(request.getLiveSessionId())
                .build();
        sendMessage("/topic/" + request.getLiveSessionId(), response);

        // Test
        lives.removeIf(live -> live.getId().equals(response.getLiveSessionId()));

    }

    public synchronized void exchangeOffer(RtcTransportDTO request) {

        // Retrieve UserSession from LiveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(request.getLiveSessionId())
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        Optional<UserSession> userSession = request.getAction() == RtcActionEnum.OFFER_PRESENTER
                ? liveSession.getPresenterByUsername(request.getUsername())
                : liveSession.getViewerByUsername(request.getUsername());

        UserSession user = userSession
                .orElseThrow(() -> new RuntimeException("Could not find UserSession matching username"));

        // // Connect presenter's endpoint with viewer's endpoint if user is viewer
        if (request.getAction() == RtcActionEnum.OFFER_VIEWER) {
            UserSession presenter = liveSession.getPresenters().values().iterator().next();
            presenter.getWebRtcEndpoint().connect(user.getWebRtcEndpoint());
        }

        // Process the offer on user's endpoint
        String answer = user.getWebRtcEndpoint().processOffer(request.getOffer());

        // Send answer to client
        RtcTransportDTO response = RtcTransportDTO.builder()
                .action(RtcActionEnum.SDP_ANSWER)
                .liveSessionId(liveSession.getLiveSessionId())
                .answer(answer)
                .build();
        sendMessage("/queue/" + user.getUsername(), response);

        log.info("{}-{}: Sending answer to the client"
                , liveSession.getLiveSessionId(), user.getUsername());

        user.getWebRtcEndpoint().gatherCandidates();
    }


    public synchronized void exchangeCandidate(RtcTransportDTO request) {

        // Retrieve UserSession from LiveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(request.getLiveSessionId())
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        Optional<UserSession> userSession = Optional
                .ofNullable(liveSession.getPresenterByUsername(request.getUsername())
                .orElseGet(() -> liveSession.getViewerByUsername(request.getUsername()).orElse(null)));

        UserSession user = userSession
                .orElseThrow(() -> new RuntimeException("Could not find UserSession matching username"));

        // Process the candidate using the user's endpoint
        user.getWebRtcEndpoint().addIceCandidate(request.getCandidate());

        log.info("{}-{}: Collecting the candidates "
                , liveSession.getLiveSessionId(), user.getUsername());
    }

    public List<LiveRequestDTO> getRecommendedLiveSessions() {
        return lives;
    }

    private synchronized void sendMessage(String destination, RtcTransportDTO response) {
        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend(destination , response);
        }
    }

    private void addIceFoundListener(UserSession userSession, LiveSession liveSession) {

        userSession.getWebRtcEndpoint().addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent event) {
                RtcTransportDTO response = RtcTransportDTO.builder()
                        .action(RtcActionEnum.ICE_CANDIDATE)
                        .liveSessionId(liveSession.getLiveSessionId()) // request hasn't liveSessionId
                        .candidate(event.getCandidate())
                        .build();
                sendMessage("/queue/" + userSession.getUsername(), response);

                log.info("{}-{}: Sending candidate to the client"
                        , liveSession.getLiveSessionId(), userSession.getUsername());
            }
        });
    }
}




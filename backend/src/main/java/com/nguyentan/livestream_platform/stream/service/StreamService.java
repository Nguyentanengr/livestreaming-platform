package com.nguyentan.livestream_platform.stream.service;


import com.google.gson.JsonObject;
import com.nguyentan.livestream_platform.stream.dto.LiveSessionResponse;
import com.nguyentan.livestream_platform.stream.model.LiveSession;
import com.nguyentan.livestream_platform.stream.model.LiveSessionManager;
import com.nguyentan.livestream_platform.stream.model.UserSession;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.jsonrpc.JsonUtils;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
public class StreamService {

    private final LiveSessionManager liveSessionManager;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public StreamService(LiveSessionManager liveSessionManager, SimpMessagingTemplate simpMessagingTemplate) {
        this.liveSessionManager = liveSessionManager;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    public synchronized void registryPresenter(String userSessionId) {

        // create live session
        LiveSession liveSession = liveSessionManager.getLiveSession();

        // Join presenter into live session and create user session
        UserSession user = liveSession.joinPresenter(userSessionId);

        // Mount CandidateFoundListener into Endpoint
        user.getWebRtcEndpoint().addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

            @Override
            public void onEvent(IceCandidateFoundEvent event) {

                JsonObject candidate = new JsonObject();
                candidate.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));

                JsonObject message = new JsonObject();
                message.addProperty("id", "processCandidate");
                message.addProperty("liveSession", liveSession.getId());
                message.add("data", candidate);

                synchronized (simpMessagingTemplate) {
                    simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
                }

                log.info("{}-{}: Sending candidate to the client"
                        , liveSession.getId(), userSessionId);
            }
        });

        log.info("{}-{}: Created LiveSession and UserSession"
                , liveSession.getId(), userSessionId);

        // Response after completed registration
        JsonObject message = new JsonObject();
        message.addProperty("id", "createPeerPresenter");
        message.addProperty("liveSession", liveSession.getId());

        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
        }

        log.info("{}-{}: Sending message to the client with id: createPeerPresenter"
                , liveSession.getId(), userSessionId);
    }

    public synchronized void registryViewer(String userSessionId, String liveSessionId) {

        // Get live session
        LiveSession liveSession = liveSessionManager.getLiveSession(liveSessionId)
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));

        // Join viewer into live session and create user session
        UserSession user = liveSession.joinViewer(userSessionId);

        // Mount CandidateFoundListener into Endpoint
        user.getWebRtcEndpoint().addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

            @Override
            public void onEvent(IceCandidateFoundEvent event) {
                JsonObject candidate = new JsonObject();
                candidate.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));

                JsonObject message = new JsonObject();
                message.addProperty("id", "processCandidate");
                message.addProperty("liveSession", liveSession.getId());
                message.add("data", candidate);

                synchronized (simpMessagingTemplate) {
                    simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
                }

                log.info("{}-{}: Sending candidate to the client"
                        , liveSession.getId(), userSessionId);
            }
        });

        log.info("{}-{}: Got LiveSession and created UserSession"
                , liveSession.getId(), userSessionId);

        // Send to everyone else in the session about participation (chat service)

        // Response after completed registration
        JsonObject message = new JsonObject();
        message.addProperty("id", "createPeerViewer");
        message.addProperty("liveSession", liveSession.getId());

        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
        }

        log.info("{}-{}: Sending message to the client with id: createPeerViewer"
                , liveSessionId, userSessionId);
    }

    public synchronized void exchangeOfferPresenter(String userSessionId, String liveSessionId, String offer) {

        // Retrieve UserSession from LiveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(liveSessionId)
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));
        UserSession presenter = liveSession.getPresenterById(userSessionId)
                .orElseThrow(() -> new RuntimeException("Could not find Presenter matching userSessionId in LiveSession"));

        // Process the offer using the user's endpoint
        String answer = presenter.getWebRtcEndpoint().processOffer(offer);

        // Send answer to client
        JsonObject answerJson = new JsonObject();
        answerJson.addProperty("sdpAnswer", answer);

        JsonObject message = new JsonObject();
        message.addProperty("id", "processAnswer");
        message.addProperty("liveSession", liveSession.getId());
        message.add("data", answerJson);

        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
        }

        log.info("{}-{}: Sending answer to the client", liveSessionId, userSessionId);

        presenter.getWebRtcEndpoint().gatherCandidates();
    }

    public synchronized void exchangeOfferViewer(String userSessionId, String liveSessionId, String offer) {

        // Retrieve UserSession from LiveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(liveSessionId)
                .orElseThrow(() -> new RuntimeException("Could not find LiveSession matching liveSessionId"));
        UserSession viewer = liveSession.getViewerById(userSessionId)
                .orElseThrow(() -> new RuntimeException("Could not find Presenter matching userSessionId in LiveSession"));

        // Connect Endpoint Presenter with Endpoint Viewer
        UserSession presenter = liveSession.getPresenters().values().iterator().next();
        log.info(presenter.getUserSessionId());
        presenter.getWebRtcEndpoint().connect(viewer.getWebRtcEndpoint());

        // Process the offer using the user's endpoint
        String answer = viewer.getWebRtcEndpoint().processOffer(offer);

        // Send answer to client
        JsonObject answerJson = new JsonObject();
        answerJson.addProperty("sdpAnswer", answer);

        JsonObject message = new JsonObject();
        message.addProperty("id", "processAnswer");
        message.addProperty("liveSession", liveSession.getId());
        message.add("data", answerJson);

        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend("/queue/" + userSessionId , message.toString());
        }

        log.info("{}-{}: Sending answer to the client", liveSessionId, userSessionId);

        viewer.getWebRtcEndpoint().gatherCandidates();
    }

    public synchronized void exchangeCandidate(String userSessionId, String liveSessionId, IceCandidate iceCandidate) {

        // Retrieve UserSession from LiveSession
        LiveSession liveSession = liveSessionManager.getLiveSession(liveSessionId).get();

        Optional<UserSession> userSession = Optional.ofNullable(liveSession.getPresenterById(userSessionId)
                .orElseGet(() -> liveSession.getViewerById(userSessionId).orElse(null)));

        log.info("{}-{}: Collecting the candidates ", liveSessionId, userSessionId);

        userSession.ifPresent(session -> session.getWebRtcEndpoint().addIceCandidate(iceCandidate));
        // Process the candidate using the user's endpoint
    }

    public List<LiveSessionResponse> getRecommendedLiveSessions() {
        List<LiveSessionResponse> liveSessionResponses = new ArrayList<>();
        liveSessionManager.getLiveSessions().values().forEach(liveSession -> {
            LiveSessionResponse liveSessionResponse = LiveSessionResponse.builder()
                    .id(liveSession.getId())
                    .username(liveSession.getUsername())
                    .title(liveSession.getTitle())
                    .game(liveSession.getGame())
                    .tags(liveSession.getTags())
                    .pp(liveSession.getPp())
                    .liveScreen(liveSession.getLiveScreen())
                    .viewers(1000)
                    .build();
            liveSessionResponses.add(liveSessionResponse);
        });

        return liveSessionResponses;
    }
}




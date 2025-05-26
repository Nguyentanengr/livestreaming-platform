package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.constant.RtcAction;
import com.anonymous.streaming_platform.context.StreamSession;
import com.anonymous.streaming_platform.context.StreamSessionManager;
import com.anonymous.streaming_platform.context.UserSession;
import com.anonymous.streaming_platform.dto.event.RtcTransportEvent;
import com.anonymous.streaming_platform.dto.event.StreamTransportEvent;
import com.anonymous.streaming_platform.entity.mysql.Stream;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.repository.mysql.StreamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidateFoundEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WsStreamService {

    private final StreamSessionManager streamSessionManager;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final StreamRepository streamRepository;

    public synchronized String createStreamSession(String userSessionId) {

        StreamSession streamSession = streamSessionManager.getStreamSession();

        UserSession userSession = streamSession.joinPresenter(userSessionId);

        addIceFoundListener(userSession, streamSession);

        log.info("Created stream session with streamId: {}", streamSession.getStreamId());
        log.info("Created user session with userSessionId: {}", userSession.getUserSessionId());

        return streamSession.getStreamId();
    }

    public synchronized void joinLiveSession(StreamTransportEvent event) {

        try {
            // Lấy stream session mà viewer muốn tham gia
            StreamSession streamSession = streamSessionManager.getStreamSession(event.streamId())
                    .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, event.streamId()));

            // Tạo user session mới cho viewer và thêm vào stream session
            UserSession userSession = streamSession.joinViewer(event.userSessionId());

            // Trao đổi metadata giữa các peer để tiến hành kết nối peer
            addIceFoundListener(userSession, streamSession);

            log.info("Created new user session: {} and join into stream session with streamId: {}"
                    , userSession.getUserSessionId(), streamSession.getStreamId());

            // Gửi sự kiện cho các viewer khác thông qua chat service
            // ...

            RtcTransportEvent response = RtcTransportEvent.builder()
                    .action(RtcAction.PEER_VIEWER)
                    .streamId(streamSession.getStreamId())
                    .build();
            sendMessage("/queue/" + userSession.getUserSessionId(), response);

            log.info("Sent message to {} with action: PEER_VIEWER"
                    , "/queue/" + userSession.getUserSessionId());

        } catch (Exception e) {
            sendErrorResponse(event.streamId(), event.userSessionId(), e.getMessage());
        }
    }

    public synchronized void leaveLiveSession(StreamTransportEvent event) {
        try {
            // Close the userSession, Remove the user out of liveSession
            StreamSession streamSession = streamSessionManager.getStreamSession(event.streamId())
                    .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, event.streamId()));

            streamSession.leaveUserSession(event.userSessionId());

            // Response to self after completing leave liveSession
            RtcTransportEvent response = RtcTransportEvent.builder()
                    .action(RtcAction.PEER_CANCEL)
                    .streamId(event.streamId())
                    .build();
            sendMessage("/queue/" + event.userSessionId(), response);

            log.info("Sent message to {} with action: PEER_CANCEL"
                    , "/queue/" + event.userSessionId());

            // Gửi sự kiện thông báo cho mọi người trong stream session khi rời khỏi stream
            // ...

            // Cập nhật view
            // ...

        } catch (Exception e) {
            sendErrorResponse(event.streamId(), event.userSessionId(), e.getMessage());
        }
    }

    public synchronized void endLiveSession(StreamTransportEvent event) {
        try {
            // Close all userSession, Remove all user out of liveSession
            StreamSession streamSession = streamSessionManager.getStreamSession(event.streamId())
                    .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, event.streamId()));

            streamSession.leaveAllUserSession();

            // Close liveSession, Remove liveSession out of liveSessionManager
            log.info("Removed stream session: {} out of streamSessionManager", streamSession.getStreamId());
            streamSessionManager.removeStreamSession(streamSession.getStreamId());

            // Response after completing end liveSession
            RtcTransportEvent response = RtcTransportEvent.builder()
                    .action(RtcAction.PEER_CANCEL)
                    .streamId(event.streamId())
                    .build();
            sendMessage("/topic/" + event.streamId(), response);

            // Cập nhật thông tin stream với ended_at = now()
            updateOffStream(event.streamId());
        } catch (Exception e) {
            sendErrorResponse(event.streamId(), event.userSessionId(), e.getMessage());
        }

    }

    public synchronized void exchangeOffer(RtcTransportEvent event) {
        try {
            // Lấy thông tin user session từ stream session
            StreamSession streamSession = streamSessionManager.getStreamSession(event.streamId())
                    .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, event.streamId()));

            Optional<UserSession> userSession = event.action() == RtcAction.OFFER_PRESENTER
                    ? streamSession.getPresenterByUserSessionId(event.userSessionId())
                    : streamSession.getViewerByUserSessionId(event.userSessionId());

            UserSession user = userSession
                    .orElseThrow(() -> new EntityNotFoundException(Error.USER_SESSION_NOT_FOUND, event.userSessionId()));

            // Kết nối peer của viewer với presenter
            if (event.action() == RtcAction.OFFER_VIEWER) {
                UserSession presenter = streamSession.getPresenters().values().iterator().next();
                presenter.getWebRtcEndpoint().connect(user.getWebRtcEndpoint());

                log.info("Connected viewer with presenter peer");
            }

            // Xử lý offer và gửi cho client
            String answer = user.getWebRtcEndpoint().processOffer(event.offer());
            log.info("Processed offer from userSessionId: {}", event.userSessionId());

            sendAnswerResponse(event.streamId(), event.userSessionId(), answer);

            user.getWebRtcEndpoint().gatherCandidates();
        } catch (Exception e) {
            sendErrorResponse(event.streamId(), event.userSessionId(), e.getMessage());
        }
    }

    public synchronized void exchangeCandidate(RtcTransportEvent event) {

        try {
            // Retrieve UserSession from LiveSession
            StreamSession streamSession = streamSessionManager.getStreamSession(event.streamId())
                    .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, event.streamId()));

            Optional<UserSession> userSession = Optional
                    .ofNullable(streamSession.getPresenterByUserSessionId(event.userSessionId())
                            .orElseGet(() -> streamSession.getViewerByUserSessionId(event.userSessionId()).orElse(null)));

            UserSession user = userSession
                    .orElseThrow(() -> new EntityNotFoundException(Error.USER_SESSION_NOT_FOUND, event.userSessionId()));

            // Process the candidate using the user's endpoint
            user.getWebRtcEndpoint().addIceCandidate(event.candidate());

            log.info("Collected the candidates from userSessionId: {}", event.userSessionId());
        } catch (Exception e) {
            sendErrorResponse(event.streamId(), event.userSessionId(), e.getMessage());
        }
    }


    public void sendAnswerResponse(String streamId, String userSessionId, String answer) {
        RtcTransportEvent response = RtcTransportEvent.builder()
                .action(RtcAction.SDP_ANSWER)
                .streamId(streamId)
                .answer(answer)
                .build();
        sendMessage("/queue/" + userSessionId, response);

        log.info("Sent answer to {} with action: SDP_ANSWER", "/queue/" + userSessionId);
    }

    public void sendCreationResponse(String streamId, String userSessionId) {
        RtcTransportEvent response = RtcTransportEvent.builder()
                .action(RtcAction.PEER_PRESENTER)
                .streamId(streamId)
                .build();
        sendMessage("/queue/" + userSessionId, response);

        log.info("Sent message to {} with action: PEER_PRESENTER", "/queue/" + userSessionId);
    }

    public void sendErrorResponse(String streamId, String userSessionId, String error) {
        RtcTransportEvent response = RtcTransportEvent.builder()
                .action(RtcAction.ERROR)
                .streamId(streamId)
                .error(error)
                .build();
        sendMessage("/queue/" + userSessionId, response);

        log.info("Sent message to {} with action: ERROR", "/queue/" + userSessionId);
    }



    private void addIceFoundListener(UserSession userSession, StreamSession streamSession) {

        userSession.getWebRtcEndpoint().addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent event) {
                RtcTransportEvent response = RtcTransportEvent.builder()
                        .action(RtcAction.ICE_CANDIDATE)
                        .streamId(streamSession.getStreamId()) // request hasn't liveSessionId
                        .candidate(event.getCandidate())
                        .build();
                sendMessage("/queue/" + userSession.getUserSessionId(), response);

                log.info("Sent candidate to {} with action: ICE_CANDIDATE"
                        , "/queue/" + userSession.getUserSessionId());

            }
        });
    }

    private synchronized void sendMessage(String destination, RtcTransportEvent response) {
        synchronized (simpMessagingTemplate) {
            simpMessagingTemplate.convertAndSend(destination , response);
        }
    }


    private void updateOffStream(String streamId) {

        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, streamId));

        stream.setEndedAt(LocalDateTime.now());
        streamRepository.save(stream);

        log.info("Updated stream {} to off.", streamId);

    }
}

package com.anonymous.streaming_platform.context;


import com.anonymous.streaming_platform.entity.mysql.Stream;
import com.anonymous.streaming_platform.service.CodeGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Getter
@Setter
@Builder
@AllArgsConstructor
public class StreamSession {

    private String streamId;
    private final MediaPipeline pipeline;
    private ConcurrentMap<String, UserSession> presenters = new ConcurrentHashMap<>();
    private ConcurrentMap<String, UserSession> viewers = new ConcurrentHashMap<>();;

    public StreamSession(MediaPipeline pipeline, CodeGenerator codeGenerator) {
        this.pipeline = pipeline;
        this.streamId = codeGenerator.nextCode(CodeGenerator.CodeType.STREAM_ID);
        log.info("Created new stream session with id: {}", this.streamId);
    }

    public Optional<UserSession> getPresenterByUserSessionId(String userSessionId) {
        return Optional.ofNullable(presenters.get(userSessionId));
    }

    public Optional<UserSession> getViewerByUserSessionId(String userSessionId) {
        return Optional.ofNullable(viewers.get(userSessionId));
    }

    public Optional<UserSession> getUserSessionBySessionId(String userSessionId) {
        return getPresenterByUserSessionId(userSessionId).isPresent()
                ? getPresenterByUserSessionId(userSessionId)
                : getViewerByUserSessionId(userSessionId);
    }

    public UserSession joinPresenter(String userSessionId) {
        UserSession user = new UserSession(userSessionId, this.streamId, this.pipeline);
        presenters.put(user.getUserSessionId(), user);
        return user;
    }

    public UserSession joinViewer(String userSessionId) {
        UserSession user = new UserSession(userSessionId, this.streamId, this.pipeline);
        viewers.put(user.getUserSessionId(), user);
        return user;
    }

    public void leaveUserSession(String userSessionId) {
        try {
            // Đóng phiên của user khi rời khỏi stream (đóng kết nối peer, giải phóng)
            UserSession userSession = viewers.get(userSessionId);
            if (userSession == null) {
                throw new RuntimeException("");
            }
            userSession.close();
        } catch (Exception e) {
            log.warn("{}-{} Could not close the userSession", StreamSession.this.streamId, userSessionId);
        }

        // xóa user khỏi danh sách view hiện tại
        viewers.remove(userSessionId);
        log.info("{}-{}: left userSession in liveSession", this.streamId, userSessionId);
    }

    public void leaveAllUserSession() {

        try {
            // Giải phóng phiên khi chủ phòng rời khỏi
            presenters.values().forEach(UserSession::close);

            // giải phóng tất cả user đang xem
            viewers.values().forEach(UserSession::close);
        } catch (Exception e) {
            log.warn("{} Could not close all userSession", this.streamId);
        }

        // Xóa tất cả trong context
        presenters.clear();
        viewers.clear();

        log.info("{}: left all userSession in liveSession", this.streamId);
    }

    public void close() {
        pipeline.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void result) throws Exception {
                log.info("{}: Released Pipeline", StreamSession.this.streamId);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("{}: Could not release Pipeline", StreamSession.this.streamId);
            }
        });
        log.info("{}: closed liveSession",  this.streamId);
    }
}

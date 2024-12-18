package com.nguyentan.livestream_platform.context;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Log4j2
@Getter
@Setter
@Builder
@AllArgsConstructor
public class LiveSession {

    private String liveSessionId;
    private final MediaPipeline pipeline;
    private ConcurrentMap<String, UserSession> presenters = new ConcurrentHashMap<>();
    private ConcurrentMap<String, UserSession> viewers = new ConcurrentHashMap<>();

    public LiveSession(MediaPipeline pipeline) {
        this.pipeline = pipeline;
        this.liveSessionId = UUID.randomUUID().toString();
    }

    public Optional<UserSession> getPresenterByUsername(String username) {
        return Optional.ofNullable(presenters.get(username));
    }

    public Optional<UserSession> getViewerByUsername(String username) {
        return Optional.ofNullable(viewers.get(username));
    }

    public UserSession joinPresenter(String username) {
        UserSession user = new UserSession(username, this.liveSessionId, this.pipeline);
        presenters.put(user.getUsername(), user);
        return user;
    }

    public UserSession joinViewer(String userSessionId) {
        UserSession user = new UserSession(userSessionId, this.liveSessionId, this.pipeline);
        viewers.put(user.getUsername(), user);
        return user;
    }

    public void leaveAllUserSession() {

        try {
            // close presenter
            presenters.values().forEach(UserSession::close);

            // close viewer
            viewers.values().forEach(UserSession::close);
        } catch (Exception e) {
            log.warn("{} Could not leave all userSession", LiveSession.this.liveSessionId);
        }

        // remove all
        presenters.clear();
        viewers.clear();

        log.info("{}: left all userSession in liveSession", this.liveSessionId);
    }

    public void close() {
        pipeline.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void result) throws Exception {
                log.info("{}: Released Pipeline", LiveSession.this.liveSessionId);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("{}: Could not release Pipeline", LiveSession.this.liveSessionId);
            }
        });
        log.info("{}: closed liveSession",  this.liveSessionId);
    }
}

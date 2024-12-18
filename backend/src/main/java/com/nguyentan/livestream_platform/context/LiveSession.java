package com.nguyentan.livestream_platform.context;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
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

    public void leaveAll() {

        // close presenter
        presenters.values().forEach(UserSession::close);

        // close viewer
        viewers.values().forEach(UserSession::close);

        // remove all
        presenters.clear();
        viewers.clear();

    }


//    public void close() {
//        for (UserSession user : presenters.values()) {
//            try {
//                user.close();
//            } catch (Exception e) {
//                log.debug("Could not invoke close on participant {}", user.getUsername());
//            }
//        }
//
//        for (UserSession user : viewers.values()) {
//            try {
//                user.close();
//            } catch (Exception e) {
//                log.debug("Could not invoke close on participant {}", user.getUsername());
//            }
//        }
//
//        presenters.clear();
//        viewers.clear();
//    }
}

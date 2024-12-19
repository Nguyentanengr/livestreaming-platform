package com.nguyentan.livestream_platform.context;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.KurentoClient;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Log4j2
@Getter
@Setter
@Builder
@Component
public class LiveSessionManager {

    private final KurentoClient kurento;

    private final ConcurrentMap<String, LiveSession> liveSessions = new ConcurrentHashMap<>();

    public LiveSessionManager(KurentoClient kurento) {
        this.kurento = kurento;
    }

    public LiveSession getLiveSession() {
        LiveSession liveSession = new LiveSession(kurento.createMediaPipeline());
        liveSessions.put(liveSession.getLiveSessionId(), liveSession);
        return liveSession;
    }

    public Optional<LiveSession> getLiveSession(String liveSessionId) {
        LiveSession liveSession = liveSessions.get(liveSessionId);
        return Optional.ofNullable(liveSession);
    }

    public boolean existLiveSession(String liveSessionId) {
        return getLiveSession(liveSessionId).isPresent();
    }

    public void removeLiveSession(String liveSessionId) {
        LiveSession liveSession = liveSessions.get(liveSessionId);
        liveSession.close();
        liveSessions.remove(liveSessionId);

    }
}

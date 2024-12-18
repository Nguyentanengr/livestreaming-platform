package com.nguyentan.livestream_platform.context;


import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.*;

@Log4j2
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserSession {

    private final String username;
    private final String liveSessionId;
    private final MediaPipeline pipeline;
    private final WebRtcEndpoint webRtcEndpoint;

    public UserSession (String username, String liveSessionId, MediaPipeline pipeline) {
        this.username = username;
        this.liveSessionId = liveSessionId;
        this.pipeline = pipeline;
        this.webRtcEndpoint = new WebRtcEndpoint.Builder(pipeline).build();

    }

    public void close() {
        webRtcEndpoint.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void unused) throws Exception {
                log.info("{}-{}: Released user's endpoint", UserSession.this.liveSessionId
                        , UserSession.this.username);
            }
            @Override
            public void onError(Throwable throwable) throws Exception {
                log.warn("{}-{}: Could not release user's endpoint", UserSession.this.liveSessionId
                        , UserSession.this.username);
            }
        });

        log.info("{}-{}: closed userSession", this.liveSessionId
                , this.username);
    }
}

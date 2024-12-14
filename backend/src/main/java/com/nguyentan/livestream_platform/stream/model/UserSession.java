package com.nguyentan.livestream_platform.stream.model;


import com.google.gson.JsonObject;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.*;
import org.kurento.jsonrpc.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Log4j2
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserSession {

    private final String userSessionId;
    private final String liveSessionId;
    private final MediaPipeline pipeline;
    private final WebRtcEndpoint webRtcEndpoint;

    public UserSession (String userSessionId, String liveSessionId, MediaPipeline pipeline) {
        this.userSessionId = userSessionId;
        this.liveSessionId = liveSessionId;
        this.pipeline = pipeline;
        this.webRtcEndpoint = new WebRtcEndpoint.Builder(pipeline).build();
    }

    public void close() {
        webRtcEndpoint.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void unused) throws Exception {
                log.trace("PARTICIPANT {}: Released outgoing EP"
                        , UserSession.this.userSessionId);
            }

            @Override
            public void onError(Throwable throwable) throws Exception {
                log.warn("USER {}: Could not release outgoing EP"
                        , UserSession.this.userSessionId);
            }
        });
    }
}

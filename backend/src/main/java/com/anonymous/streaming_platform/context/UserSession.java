package com.anonymous.streaming_platform.context;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;

@Log4j2
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserSession {


    private final String userSessionId;
    private final String streamId;
    private final MediaPipeline pipeline;
    private final WebRtcEndpoint webRtcEndpoint;

    public UserSession (String userSessionId, String streamId, MediaPipeline pipeline) {
        this.userSessionId = userSessionId;
        this.streamId = streamId;
        this.pipeline = pipeline;
        this.webRtcEndpoint = new WebRtcEndpoint.Builder(pipeline).build();

    }

    public void close() {
        webRtcEndpoint.release(new Continuation<Void>() {
            @Override
            public void onSuccess(Void unused) throws Exception {
                log.info("{}-{}: Released user's endpoint", UserSession.this.streamId
                        , UserSession.this.userSessionId);
            }
            @Override
            public void onError(Throwable throwable) throws Exception {
                log.warn("{}-{}: Could not release user's endpoint", UserSession.this.streamId
                        , UserSession.this.userSessionId);
            }
        });

        log.info("{}-{}: closed userSession", this.streamId
                , this.userSessionId);
    }
}

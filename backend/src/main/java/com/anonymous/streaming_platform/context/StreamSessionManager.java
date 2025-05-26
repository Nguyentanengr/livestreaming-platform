package com.anonymous.streaming_platform.context;


import com.anonymous.streaming_platform.service.CodeGenerator;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.KurentoClient;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Getter
@Setter
@Builder
@Component
public class StreamSessionManager {

    private final KurentoClient kurento;
    private final CodeGenerator codeGenerator;

    private final ConcurrentHashMap<String, StreamSession> streamSessions = new ConcurrentHashMap<>();

    public StreamSessionManager(KurentoClient kurento, CodeGenerator codeGenerator) {
        this.kurento = kurento;
        this.codeGenerator = codeGenerator;
    }

    public StreamSession getStreamSession() {
        StreamSession streamSession = new StreamSession(kurento.createMediaPipeline(), codeGenerator);
        streamSessions.put(streamSession.getStreamId(), streamSession);
        return streamSession;
    }

    public Optional<StreamSession> getStreamSession(String streamId) {
        StreamSession streamSession = streamSessions.get(streamId);
        return Optional.ofNullable(streamSession);
    }

    public boolean existStreamSession(String streamId) {
        return getStreamSession(streamId).isPresent();
    }

    public void removeStreamSession(String streamId) {
        StreamSession streamSession = streamSessions.get(streamId);
        streamSession.close();
        streamSessions.remove(streamId);
    }
}

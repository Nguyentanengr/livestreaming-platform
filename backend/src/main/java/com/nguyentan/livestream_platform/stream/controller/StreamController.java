package com.nguyentan.livestream_platform.stream.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.nguyentan.livestream_platform.stream.dto.LiveSessionResponse;
import com.nguyentan.livestream_platform.stream.service.StreamService;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.IceCandidate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/liveSessions")
public class StreamController {

    private final StreamService streamService;

    public StreamController(StreamService streamService) {
        this.streamService = streamService;
    }

    @GetMapping("/recommended")
    public List<LiveSessionResponse> getRecommendedLiveSessions() {
        return streamService.getRecommendedLiveSessions();

    }

    @MessageMapping("/stream/registry")
    public void registrySession(@Payload String message) {
        try {
            JsonObject jsonObject = JsonParser.parseString(message).getAsJsonObject();
            String id = jsonObject.get("id").getAsString();
            String userSessionId = jsonObject.get("userSession").getAsString();
            switch (id) {
                case "registryPresenter":
                    streamService.registryPresenter(userSessionId);
                    break;
                case "registryViewer":
                    String liveSessionId = jsonObject.getAsJsonPrimitive("liveSession").getAsString();
                    streamService.registryViewer(userSessionId, liveSessionId);
                    break;
            }
        } catch (Exception e) {
            handleGlobalException(e);
        }
    }

    @MessageMapping("/stream/exchange")
    public void exchange(@Payload String message) {
        try {
            JsonObject jsonObject = JsonParser.parseString(message).getAsJsonObject();
            String id = jsonObject.get("id").getAsString();
            String userSessionId = jsonObject.get("userSession").getAsString();
            String liveSessionId = jsonObject.get("liveSession").getAsString();
            JsonObject data = jsonObject.get("data").getAsJsonObject();

            switch (id) {
                case "exchangeOfferPresenter":
                    String offerPresenter = data.get("sdpOffer").getAsString();
                    streamService.exchangeOfferPresenter(userSessionId, liveSessionId, offerPresenter);
                    break;
                case "exchangeOfferViewer":
                    String offerViewer = data.get("sdpOffer").getAsString();
                    streamService.exchangeOfferViewer(userSessionId, liveSessionId, offerViewer);
                    break;
                case "exchangeCandidate":
                    JsonObject candidate = data.get("candidate").getAsJsonObject();
                    IceCandidate iceCandidate = new IceCandidate(
                            candidate.get("candidate").getAsString(),
                            candidate.get("sdpMid").getAsString(),
                            candidate.get("sdpMLineIndex").getAsInt()
                    );
                    streamService.exchangeCandidate(userSessionId, liveSessionId, iceCandidate);
                    break;
            }
        } catch (Exception e) {
            handleGlobalException(e);
        }
    }


    private void handleGlobalException(Exception e) {
        log.info("Global Exception");
        e.printStackTrace();
    }



}

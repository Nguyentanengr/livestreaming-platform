package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.context.StreamSessionManager;
import com.anonymous.streaming_platform.dto.response.ViewResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ViewScheduleService {

    private final StreamSessionManager streamSessionManager;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedRate = 5000) // chạy mỗi 2 giay
    public void viewSchedule() {
        streamSessionManager.getStreamSessions().forEach((streamId, streamSession) -> {
            int viewersCount = streamSession.getViewers().size();
            log.info("Sending viewers count {} to streamId {}.", viewersCount, streamId);

            simpMessagingTemplate.convertAndSend("/topic/view/" + streamId
                        , new ViewResponse(viewersCount));
        });
    }
}

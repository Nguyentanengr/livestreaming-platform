package com.nguyentan.livestream_platform.stream.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.kurento.client.MediaPipeline;

import java.util.ArrayList;
import java.util.List;
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

    private String id;
    private String username;
    private String title;
    private String game;
    private ArrayList<String> tags;
    private String pp;
    private String liveScreen;

    private final MediaPipeline pipeline;
    private ConcurrentMap<String, UserSession> presenters = new ConcurrentHashMap<>();
    private ConcurrentMap<String, UserSession> viewers = new ConcurrentHashMap<>();

    public LiveSession(MediaPipeline pipeline) {
        this.pipeline = pipeline;
        this.id = UUID.randomUUID().toString();
        this.username = "Kole Pamhmer";
        this.title = "Compact 2FLat fighting 0Z";
        this.game = "Dota 2";
        this.tags = new ArrayList<>(List.of("Funny", "Fighting"));
        this.pp = "https://i.pravatar.cc/";
        this.liveScreen = "./images/games/game-chees.jpg";
    }

    public Optional<UserSession> getPresenterById(String id) {
        return Optional.ofNullable(presenters.get(id));
    }

    public Optional<UserSession> getViewerById(String id) {
        return Optional.ofNullable(viewers.get(id));
    }

    public UserSession joinPresenter(String userSessionId) {
        UserSession user = new UserSession(userSessionId, this.id, pipeline);
        presenters.put(user.getUserSessionId(), user);
        return user;
    }

    public UserSession joinViewer(String userSessionId) {
        UserSession user = new UserSession(userSessionId, this.id, pipeline);
        viewers.put(user.getUserSessionId(), user);
        return user;
    }

    public void close() {
        for (UserSession user : presenters.values()) {
            try {
                user.close();
            } catch (Exception e) {
                log.debug("Could not invoke close on participant {}", user.getUserSessionId());
            }
        }

        for (UserSession user : viewers.values()) {
            try {
                user.close();
            } catch (Exception e) {
                log.debug("Could not invoke close on participant {}", user.getUserSessionId());
            }
        }

        presenters.clear();
        viewers.clear();
    }
}

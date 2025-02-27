package com.nguyentan.livestream_platform.dto.other;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveRequestDTO {
    private String id;
    private String username;
    private String title;
    private String game;
    private List<String> tags;
    private String pp;
    private String liveScreen;
    private int viewers;

    @Override
    public String toString() {
        return "LiveRequestDTO{" +
                "username='" + username + '\'' +
                ", title='" + title + '\'' +
                ", game='" + game + '\'' +
                ", tags=" + tags +
                ", pp='" + pp + '\'' +
                ", liveScreen='" + liveScreen + '\'' +
                ", viewers=" + viewers +
                '}';
    }
}

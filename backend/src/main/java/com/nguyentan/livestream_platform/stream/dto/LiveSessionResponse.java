package com.nguyentan.livestream_platform.stream.dto;

import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;

@Log4j2
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveSessionResponse {
    private String id;
    private String username;
    private String title;
    private String game;
    private ArrayList<String> tags;
    private String pp;
    private String liveScreen;
    private int viewers;
}

package com.nguyentan.livestream_platform.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Live {
    private String id;
    private String title;
    private String notification;

    private User presenter;
    private String game;
    private List<Tag> tags; // Many to one
    private String pp;
    private String liveScreen;
    private int viewers;
    private List<Chat> chats; /// Many to one
}

package com.nguyentan.livestream_platform.entity.test;

import com.nguyentan.livestream_platform.entity.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Z_Live {
    private String id;
    private String title;
    private String notification;

    private User presenter;
    private String game;
    private List<Z_Tag> tags; // Many to one
    private String pp;
    private String liveScreen;
    private int viewers;
    private List<Z_Chat> chats; /// Many to one
}

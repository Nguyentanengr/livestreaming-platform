package com.nguyentan.livestream_platform.dto;

import com.nguyentan.livestream_platform.constant.ChatActionEnum;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Random;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponseDTO {

    private ChatActionEnum action;
    private Long id;
    private String username;
    private String content;
    private LocalDateTime timestamp;
    private String pp;

    public ChatResponseDTO(Long id, String username, String content) {
        this.action = ChatActionEnum.CHAT_MESSAGE;
        this.id = id;
        this.username = username;
        this.content = content;
        this.timestamp = LocalDateTime.now();
        this.pp = "https://i.pravatar.cc/";
    }

    @Override
    public String toString() {
        return "ChatResponseDTO{" +
                "action=" + action +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", pp='" + pp + '\'' +
                '}';
    }
}

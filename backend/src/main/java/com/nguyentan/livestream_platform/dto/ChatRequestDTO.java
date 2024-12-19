package com.nguyentan.livestream_platform.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequestDTO {

    private String liveSessionId;
    private String username;
    private String content;

    @Override
    public String toString() {
        return "ChatRequestDTO{" +
                "liveSessionId='" + liveSessionId + '\'' +
                ", username='" + username + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}

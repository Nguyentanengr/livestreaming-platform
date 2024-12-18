package com.nguyentan.livestream_platform.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    private Long id;
    private String content;
    private LocalDateTime timestamp;
}

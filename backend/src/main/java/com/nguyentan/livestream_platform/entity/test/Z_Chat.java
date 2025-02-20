package com.nguyentan.livestream_platform.entity.test;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Z_Chat {
    private Long id;
    private String content;
    private LocalDateTime timestamp;
}

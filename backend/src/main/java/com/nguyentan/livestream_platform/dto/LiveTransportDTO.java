package com.nguyentan.livestream_platform.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveTransportDTO {
    private String username;
    private String liveSessionId;
}

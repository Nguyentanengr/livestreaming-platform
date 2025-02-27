package com.nguyentan.livestream_platform.dto.other;

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

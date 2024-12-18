package com.nguyentan.livestream_platform.dto;

import com.nguyentan.livestream_platform.constant.RtcActionEnum;
import lombok.*;
import org.kurento.client.IceCandidate;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RtcTransportDTO {

    private RtcActionEnum action;

    private String username;

    private String liveSessionId;

    private String offer;

    private String answer;

    private IceCandidate candidate;
}

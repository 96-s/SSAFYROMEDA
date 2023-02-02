package com.ssafy.sfrmd.api.dto.room;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomConnectRequest {
    private String userNo;
    private String userNickname;
}

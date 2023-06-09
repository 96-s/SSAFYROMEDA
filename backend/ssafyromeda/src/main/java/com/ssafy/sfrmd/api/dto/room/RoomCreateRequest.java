package com.ssafy.sfrmd.api.dto.room;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomCreateRequest {
    private Long userNo;
    private String userNickname;
}

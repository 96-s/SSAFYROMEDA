package com.ssafy.sfrmd.api.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
    private Long userNo;
    private String userNickname;

}

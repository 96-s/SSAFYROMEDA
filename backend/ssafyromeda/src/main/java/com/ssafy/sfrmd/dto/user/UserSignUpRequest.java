package com.ssafy.sfrmd.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpRequest {
    private String userEmail;
    private String userNickname;

}

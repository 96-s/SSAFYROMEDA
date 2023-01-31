package com.ssafy.sfrmd.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpResponse {
    private String userEmail;
    private String userNickName;
    private String AccessToken;
    private String RefreshToken;
}

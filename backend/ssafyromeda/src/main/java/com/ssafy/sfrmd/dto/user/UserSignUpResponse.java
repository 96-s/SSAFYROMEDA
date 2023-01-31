package com.ssafy.sfrmd.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpResponse {
    private String userEmail;
    private String userNickName;
    private String accessToken;
    private String RefreshToken;

    @Builder
    public UserSignUpResponse(String userEmail, String userNickName, String accessToken, String refreshToken){
        this.userEmail = userEmail;
        this.userNickName = userNickName;
        this.accessToken = accessToken;
        this.RefreshToken = refreshToken;
    }
}

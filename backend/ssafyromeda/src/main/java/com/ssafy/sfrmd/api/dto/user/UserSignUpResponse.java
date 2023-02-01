package com.ssafy.sfrmd.api.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpResponse {
    private String userEmail;
    private String userNickname;
    private String accessToken;
    private String RefreshToken;

    @Builder
    public UserSignUpResponse(String userEmail, String userNickname, String accessToken, String refreshToken){
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.accessToken = accessToken;
        this.RefreshToken = refreshToken;
    }
}

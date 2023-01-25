package com.ssafy.sfrmd.dto.user;

import com.ssafy.sfrmd.domain.user.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLogInDto {
    private String userEmail;
    private Role userRole;
    private String userAccessToken;
    private String userRefreshToken;

    @Builder
    public UserLogInDto(String userEmail, Role userRole, String userAccessToken, String userRefreshToken){
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.userAccessToken = userAccessToken;
        this.userRefreshToken = userRefreshToken;
    }
}

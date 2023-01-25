package com.ssafy.sfrmd.dto.user.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AuthTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;
    private String scope;
    @JsonProperty("token_type")
    private String tokenType;

    @Builder
    public AuthTokenResponse(String accessToken, String scope, String tokenType){
        this.accessToken = accessToken;
        this.scope = scope;
        this.tokenType = tokenType;
    }
}

package com.ssafy.sfrmd.domain.user.auth;


import java.util.Map;

public class AuthUserInfo {
    protected Map<String, Object> attributes;

    public AuthUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getEmail(){
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");

        if (account == null || profile == null) {
            return null;
        }

        return (String) profile.get("account_email");
    }
}

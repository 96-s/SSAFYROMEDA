package com.ssafy.sfrmd.domain.user;

import java.util.Map;

public class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getEmail() {
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) account.get("email");

        if (account == null || profile == null) {
            return null;
        }

        return (String) profile.get("email");
    }
}

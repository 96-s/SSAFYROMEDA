package com.ssafy.sfrmd.security.oauth;

import com.ssafy.sfrmd.domain.user.Role;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.auth.AuthUserInfo;
import com.ssafy.sfrmd.dto.user.auth.AuthDto;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthAttributes {
    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private AuthUserInfo authUserInfo; // 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)
    private String email;

    public static OAuthAttributes of(String registrationId, Map<String, Object> attributes){
        return ofKakao(registrationId, attributes);
    }
    public static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .nameAttributeKey(userNameAttributeName)
            .authUserInfo(new AuthUserInfo(attributes))
            .build();
    }
    public User toEntity() {
        return User.builder()
            .userEmail(email)
            .userRole(Role.GUEST)
            .build();
    }
}

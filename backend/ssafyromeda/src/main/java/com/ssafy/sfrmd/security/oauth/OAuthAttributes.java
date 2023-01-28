package com.ssafy.sfrmd.security.oauth;

import com.ssafy.sfrmd.domain.user.Role;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.domain.user.auth.AuthUserInfo;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthAttributes {
    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private AuthUserInfo authUserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public OAuthAttributes(String nameAttributeKey, AuthUserInfo authUserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.authUserInfo = authUserInfo;
    }

    public static OAuthAttributes of(String userNameAttributeName, Map<String, Object> attributes){
        return ofKakao(userNameAttributeName, attributes);
    }
    public static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
            .nameAttributeKey(userNameAttributeName)
            .authUserInfo(new AuthUserInfo(attributes))
            .build();
    }
    public User toEntity(AuthUserInfo authUserInfo) {
        return User.builder()
                .userEmail(authUserInfo.getEmail())
                .userRole(Role.GUEST)
                .build();
    }
}

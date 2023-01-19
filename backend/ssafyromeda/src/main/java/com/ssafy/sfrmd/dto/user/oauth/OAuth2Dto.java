package com.ssafy.sfrmd.dto.user.oauth;

import com.ssafy.sfrmd.domain.user.OAuth2UserInfo;
import com.ssafy.sfrmd.domain.user.Role;
import com.ssafy.sfrmd.domain.user.User;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuth2Dto {
    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private OAuth2UserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public OAuth2Dto(String nameAttributeKey, OAuth2UserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }
    private static OAuth2Dto ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuth2Dto.builder()
            .nameAttributeKey(userNameAttributeName)
            .oauth2UserInfo(new OAuth2UserInfo(attributes))
            .build();
    }
    /**
     * ofKakao메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 주입된 상태
     * OAuth2UserInfo에서 email을 가져와서 build, role은 GUEST로 설정
     */
    public User toEntity(OAuth2UserInfo oauth2UserInfo) {
        return User.builder()
            .userEmail(oauth2UserInfo.getEmail())
            .userRole(Role.GUEST)
            .build();
    }
}

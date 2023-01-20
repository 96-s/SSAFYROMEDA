package com.ssafy.sfrmd.dto.user.auth;

import com.ssafy.sfrmd.domain.user.auth.AuthUserInfo;
import com.ssafy.sfrmd.domain.user.Role;
import com.ssafy.sfrmd.domain.user.User;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
public class AuthDto {
    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private AuthUserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public AuthDto(String nameAttributeKey, AuthUserInfo oauth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }
    public static AuthDto ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return AuthDto.builder()
            .nameAttributeKey(userNameAttributeName)
            .oauth2UserInfo(new AuthUserInfo(attributes))
            .build();
    }
    /**
     * ofKakao메소드로 OAuth2Dto 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 주입된 상태
     * OAuth2UserInfo에서 email을 가져와서 build, role은 GUEST로 설정
     */
    public User toEntity(AuthUserInfo oauth2UserInfo) {
        return User.builder()
            .userEmail(oauth2UserInfo.getEmail())
            .userRole(Role.GUEST)
            .build();
    }
}

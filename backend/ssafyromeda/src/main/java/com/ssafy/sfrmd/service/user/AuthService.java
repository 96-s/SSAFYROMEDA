package com.ssafy.sfrmd.service.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.sfrmd.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.dto.user.UserLogInDto;
import com.ssafy.sfrmd.dto.user.auth.AuthDto;
import com.ssafy.sfrmd.dto.user.auth.AuthTokenResponse;
import com.ssafy.sfrmd.jwt.JwtProvider;
import java.util.Collections;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AuthService implements OAuth2UserService<OAuth2UserRequest, AuthUser> {
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private static String clientId;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private static String redirectUri;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private static String clientSecret;

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public AuthUser loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        /**
//         * DefaultOAuth2UserService 객체를 생성하여, loadUser(userRequest)를 통해 DefaultOAuth2User 객체를 생성 후 반환
//         * DefaultOAuth2UserService의 loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서
//         * 사용자 정보를 얻은 후, 이를 통해 DefaultOAuth2User 객체를 생성 후 반환한다.
//         * 결과적으로, OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저
//         */
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        OAuth2User oAuth2User = delegate.loadUser(userRequest);
//
//        /**
//         * userRequest에서 registrationId 추출 후 registrationId으로 SocialType 저장
//         * http://localhost:8080/oauth2/authorization/kakao에서 kakao가 registrationId
//         * userNameAttributeName은 이후에 nameAttributeKey로 설정된다.
//         */
//        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
//            .getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값
//        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)
//
//        // 유저 정보를 통해 AuthDto 객체 생성
//        AuthDto authDto = AuthDto.ofKakao(userNameAttributeName, attributes);
//
//        User createdUser = getUser(authDto); // getUser() 메소드로 User 객체 생성 후 반환
//
//        // DefaultOAuth2User를 구현한 AuthUser 객체를 생성해서 반환
//        return new AuthUser(
//            Collections.singleton(new SimpleGrantedAuthority(createdUser.getUserRole().getRole())),
//            attributes,
//            authDto.getNameAttributeKey(),
//            createdUser.getUserRole());
        return null;
    }

    private User getUser(AuthDto authDto) {
        User user = userRepository.findByUserEmail(authDto.getOauth2UserInfo().getEmail()).orElse(null);

        if(user == null){
            return saveUser(authDto);
        }

        return user;
    }

    private User saveUser(AuthDto authDto) {
        User user = authDto.toEntity(authDto.getOauth2UserInfo());
        return userRepository.save(user);
    }

    public UserLogInDto loginUser(String code) throws JsonProcessingException {
        String accessToken = getAccessToken(code);
        return null;
    }

    private String getAccessToken(String code) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("client_secret", clientSecret);
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
            "https://kauth.kakao.com/oauth/token",
            HttpMethod.POST,
            kakaoTokenRequest,
            String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }

}

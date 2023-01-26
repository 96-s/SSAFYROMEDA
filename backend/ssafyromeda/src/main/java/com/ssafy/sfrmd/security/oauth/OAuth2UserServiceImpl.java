package com.ssafy.sfrmd.security.oauth;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.dto.user.auth.AuthDto;
import com.ssafy.sfrmd.security.UserDetailsImpl;
import java.util.Collections;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
private final UserRepository userRepository;
    @Override
    public UserDetailsImpl loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        OAuthAttributes attributes = OAuthAttributes.of(userNameAttributeName, oAuth2User.getAttributes());

        User createdUser = getUser(attributes); // getUser() 메소드로 User 객체 생성 후 반환
        // DefaultOAuth2User를 구현한 AuthUser 객체를 생성해서 반환
        return new UserDetailsImpl(
            createdUser.getUserEmail(),
            createdUser.getUserNickname(),
            Collections.singleton(new SimpleGrantedAuthority(createdUser.getUserRole().getRole()))
        );
    }

    private User getUser(OAuthAttributes attributes) {
        User user = userRepository.findByUserEmail(attributes.getEmail());
        if(user == null){
            return saveUser(attributes);
        }
        return user;
    }

    private User saveUser(OAuthAttributes attributes) {
        User user = attributes.toEntity();
        return userRepository.save(user);
    }

}

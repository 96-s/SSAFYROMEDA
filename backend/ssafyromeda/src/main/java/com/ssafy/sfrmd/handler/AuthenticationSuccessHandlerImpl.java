package com.ssafy.sfrmd.handler;

import com.ssafy.sfrmd.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
//        AuthUser authUser = (AuthUser) authentication.getPrincipal();
//        if(authUser.getRole() == Role.GUEST){
//            // 전달받은 인증정보 SecurityContextHolder에 저장
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            // JWT Token 발급
//            String token = jwtProvider.createAccessToken(authUser.getEmail());
//            String url = makeRedirectUrl(token);
//            getRedirectStrategy().sendRedirect(request, response, url);
//        } else{
//            String provider = String.valueOf(((UserDetailsImpl) authUser.getProvider()));
//            String url = makeRedirectUrl(provider);
//            getRedirectStrategy().sendRedirect(request, response, url);
//        }
    }

    private String makeRedirectUrl(String token) {
        return UriComponentsBuilder.fromUriString("http://i8d205.p.ssafy.io/oauth2/redirect?token="+token)
                .build().toUriString();
    }
    private void loginSuccess(HttpServletResponse response, AuthUser authUser) throws IOException {
//        String accessToken = jwtProvider.createAccessToken(authUser.getEmail());
//        String refreshToken = jwtProvider.createRefreshToken();
//        response.addHeader(jwtProvider.getAccessHeader(), "Bearer " + accessToken);
//        response.addHeader(jwtProvider.getRefreshHeader(), "Bearer " + refreshToken);
//
//        jwtProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
//        jwtProvider.updateRefreshToken(authUser.getEmail(), refreshToken);
    }
}

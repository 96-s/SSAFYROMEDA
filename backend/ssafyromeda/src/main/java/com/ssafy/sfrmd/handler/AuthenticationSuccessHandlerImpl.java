package com.ssafy.sfrmd.handler;

import com.ssafy.sfrmd.api.domain.user.Role;
import com.ssafy.sfrmd.api.domain.user.User;
import com.ssafy.sfrmd.api.domain.user.UserRepository;
import com.ssafy.sfrmd.api.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            AuthUser authUser = (AuthUser) authentication.getPrincipal();
            User user = userRepository.findByUserEmail(authUser.getEmail()).orElseThrow(NullPointerException::new);

            //userNo, userRole이 담긴 토큰 생성
            String accessToken = jwtProvider.createAccessToken(user);
            //토큰 전송
            response.sendRedirect("https://i8d205.p.ssafy.io/oauthRedirect?token="+accessToken);
            // response.sendRedirect("http://localhost:3000/oauthRedirect?token="+accessToken);
        } catch (Exception e) {
            throw e;
        }

    }

//    private void loginSuccess(HttpServletResponse response, AuthUser authUser) throws IOException {
//        String accessToken = jwtProvider.createAccessToken(authUser.getEmail());
//        String refreshToken = jwtProvider.createRefreshToken();
//        response.addHeader(jwtProvider.getAccessHeader(), "Bearer " + accessToken);
//        response.addHeader(jwtProvider.getRefreshHeader(), "Bearer " + refreshToken);
//
//        jwtProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
//        jwtProvider.updateRefreshToken(authUser.getEmail(), refreshToken);
//    }
}

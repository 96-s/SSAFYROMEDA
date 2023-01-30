package com.ssafy.sfrmd.handler;

import com.ssafy.sfrmd.domain.user.Role;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.domain.user.auth.AuthUser;
import com.ssafy.sfrmd.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
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

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if(authUser.getRole() == Role.GUEST) {
                System.out.println("GUEST 로그인");
                String accessToken = jwtProvider.createAccessToken(authUser.getEmail());
                response.addHeader(jwtProvider.getAccessHeader(), "Bearer " + accessToken);
                //회원가입 창으로 리다이렉트
                //User user = User.builder().userEmail(authUser.getEmail()).userRole(authUser.getRole()).build();
                //userRepository.save(user);

                jwtProvider.sendAccessAndRefreshToken(response, accessToken, null);
                User findUser = userRepository.findByUserEmail(authUser.getEmail())
                                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
                findUser.authorizeUser();
            } else {
                System.out.println("토큰 생성");
                loginSuccess(response, authUser); // 로그인에 성공한 경우 access, refresh 토큰 생성
            }
        } catch (Exception e) {
            throw e;
        }

    }

    private void loginSuccess(HttpServletResponse response, AuthUser authUser) throws IOException {
        String accessToken = jwtProvider.createAccessToken(authUser.getEmail());
        String refreshToken = jwtProvider.createRefreshToken();
        response.addHeader(jwtProvider.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtProvider.getRefreshHeader(), "Bearer " + refreshToken);

        jwtProvider.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtProvider.updateRefreshToken(authUser.getEmail(), refreshToken);
    }
}

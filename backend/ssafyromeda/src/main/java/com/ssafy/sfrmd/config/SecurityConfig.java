package com.ssafy.sfrmd.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
            .formLogin().disable() // FormLogin 사용 X
            .httpBasic().disable() // httpBasic 사용 X
            .csrf().disable() // csrf 보안 사용 X
            .headers().frameOptions().disable()
            .and()

            // 세션 사용하지 않으므로 STATELESS로 설정
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

            .and()

            //== URL별 권한 관리 옵션 ==//
            .authorizeRequests()

            // 아이콘, css, js 관련
            // 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 모두 접근 가능, h2-console에 접근 가능
            .antMatchers("/","/css/**","/images/**","/js/**","/favicon.ico","/h2-console/**").permitAll()
            .antMatchers("/sign-up").permitAll() // 회원가입 접근 가능
            .anyRequest().authenticated() // 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
            .and();
//            //== 소셜 로그인 설정 ==//
//            .oauth2Login()
//            .successHandler(oAuth2LoginSuccessHandler) // 동의하고 계속하기를 눌렀을 때 Handler 설정
//            .failureHandler(oAuth2LoginFailureHandler) // 소셜 로그인 실패 시 핸들러 설정
//            .userInfoEndpoint().userService(customOAuth2UserService); // customUserService 설정
//
//        // 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
//        // 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
//        // 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
//        http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
//        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}

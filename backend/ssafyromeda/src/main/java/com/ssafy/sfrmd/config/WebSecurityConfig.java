package com.ssafy.sfrmd.config;

import com.ssafy.sfrmd.api.domain.user.UserRepository;
import com.ssafy.sfrmd.jwt.JwtFilter;
import com.ssafy.sfrmd.jwt.JwtProvider;
import com.ssafy.sfrmd.security.oauth.OAuth2UserServiceImpl;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    //JWT 제공 클래스
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final OAuth2UserServiceImpl oAuth2UserServiceImpl;
    //인증 성공 핸들러
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    //인증 실패 핸들러
    private final AuthenticationFailureHandler authenticationFailureHandler;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // Access-Control-Allow-Origin 값을 설정한다.
        // setAllowedOrigins로 여러개를 한꺼번에 설정할 수 도 있다.
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://192.168.100.63:3000", "https://i8d205.p.ssafy.io"));
        // 어떤 HTTP 메서드를 허용할지 정할 수 있다.
        // setAllowedMethods로 여러개를 한꺼번에 설정할 수 있다.
        corsConfiguration.addAllowedMethod("*");
        // 허용할 헤더를 설정한다.
        corsConfiguration.addAllowedHeader("*");
        // 사용자 인증이 필요할 때 설정해줘야한다.
        // true면 브라우저에서 쿠키를 보내 사용자 인증이 필요한 리소스에 접근할 수 있다.
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        // 허용할 path 설정
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .formLogin().disable()
            .httpBasic().disable()
            .csrf().disable()
            .headers().frameOptions().disable()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            //== URL별 권한 관리 옵션 ==//
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS).permitAll()//preflight 요청 모두 허용
            .antMatchers("/", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll()
            .antMatchers("/login/*", "/users/{no}", "/users/signup","/room/*").permitAll() //로그인, 회원가입 요청은 허용
//            .antMatchers("/users/jwt-test").hasRole("GUEST")
            .antMatchers("/**").authenticated() //나머지 요청에 대해서는 인증을 요구
            .and()
            //== 소셜 로그인 설정 ==//
            .oauth2Login()
            .userInfoEndpoint().userService(oAuth2UserServiceImpl) // customUserService 설정
            .and()
            .successHandler(authenticationSuccessHandler) //동의하고 계속하기를 눌렀을 때 Handler
            .failureHandler(authenticationFailureHandler); //소셜 로그인 실패했을 때 Handler
        http.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    //JWT의 인증 및 권한을 확인하는 필터
    @Bean
    public JwtFilter jwtFilter() {
        JwtFilter jwtFilter = new JwtFilter(jwtProvider, userRepository);
        return jwtFilter;
    }
}

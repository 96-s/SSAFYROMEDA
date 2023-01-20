package com.ssafy.sfrmd.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO Auto-generated method stub
        http.csrf().disable().authorizeRequests().anyRequest().authenticated().and().httpBasic();
        http.cors();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
        auth.inMemoryAuthentication().withUser("ssafyromeda").password("{noop}ssafyromeda").roles("USER");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        // Access-Control-Allow-Origin 값을 설정한다.
        // setAllowedOrigins로 여러개를 한꺼번에 설정할 수 도 있다.
        corsConfiguration.addAllowedOrigin("http://localhost:3000");
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
            .antMatchers("/user/signup").permitAll() // 회원가입 접근 가능
            .anyRequest().permitAll() // 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
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

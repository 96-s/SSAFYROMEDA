package com.ssafy.sfrmd.security;

import java.util.Collection;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Getter
@ToString
@AllArgsConstructor
//회원 데이터를 조회하고 해당 정보와 권한을 저장하는 UserDetails를 구현
public class UserDetailsImpl implements UserDetails, OAuth2User {
    private final String email;//이메일
    private final Long no;//사용자 고유번호
    private final String nickname;//닉네임
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return email;
    }
    public Long getNo(){
        return no;
    }
    public String getNickname(){
        return nickname;
    }
    @Override
    public String getName() {
        return email;
    }
    @Override
    public Map<String, Object> getAttributes() {
        return getAttributes();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

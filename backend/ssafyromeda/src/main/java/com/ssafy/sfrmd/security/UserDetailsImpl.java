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
public class UserDetailsImpl implements UserDetails, OAuth2User {
    private final String email;//이메일
    private final String password; //비밀번호
    private final int no;//사용자 고유번호
    private final String nickname;//닉네임
    private final String provider;//제공자
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public String getPassword() {
        return password;
    }
    public int getNo(){
        return no;
    }
    public String getNickname(){
        return nickname;
    }
    public String getProvider(){
        return provider;
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

package com.ssafy.sfrmd.domain.user.auth;


import com.ssafy.sfrmd.domain.user.Role;
import java.util.Collection;
import java.util.Map;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

@Getter
public class AuthUser extends DefaultOAuth2User {
    private Role role;

    /**
     * Constructs a {@code DefaultOAuth2User} using the provided parameters.
     *
     * @param authorities      the authorities granted to the user
     * @param attributes       the attributes about the user
     * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
     *                         {@link #getAttributes()}
     */
    public AuthUser(
        Collection<? extends GrantedAuthority> authorities,
        Map<String, Object> attributes, String nameAttributeKey, Role role) {
        super(authorities, attributes, nameAttributeKey);
        this.role = role;
    }
}

package com.ssafy.sfrmd.security;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByUserEmail(email);
        if(user==null){
            return new UserDetailsImpl(email, "invalid", null);
        }else{
            return new UserDetailsImpl(
                user.getUserEmail(),
                user.getUserNickname(),
                Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().getRole()))
            );
        }
    }
}

package com.ssafy.sfrmd.service.user;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.dto.user.UserSignUpRequest;
import com.ssafy.sfrmd.dto.user.UserSignUpResponse;
import com.ssafy.sfrmd.jwt.JwtProvider;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserService{

    @Autowired
    UserRepository userRepository;
    JwtProvider jwtProvider;

    public User sighUpUser(UserSignUpRequest userSignUpRequest) {
        User user=userRepository.findByUserEmail(userSignUpRequest.getUserEmail()).orElseThrow(NullPointerException::new);
        user.updateUserNickname(userSignUpRequest.getUserNickname());
        user.updateUserRole();
        user.updateUserRefreshToken(jwtProvider.createRefreshToken());
        return user;
    }

    public Boolean checkEmail(String userEamil) {
        return null;
    }

    public Long checkNickname(String userNickname) {
        return userRepository.countUserByUserNickname(userNickname);
    }
}

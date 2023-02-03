package com.ssafy.sfrmd.api.service.user;

import com.ssafy.sfrmd.api.domain.user.User;
import com.ssafy.sfrmd.api.domain.user.UserRepository;
import com.ssafy.sfrmd.api.dto.user.UserSignUpRequest;
import com.ssafy.sfrmd.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService{
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public User getUser(Long userNo){
        return userRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
    }
    public User sighUpUser(UserSignUpRequest userSignUpRequest) {
        User user=userRepository.findByUserNo(userSignUpRequest.getUserNo()).orElseThrow(NullPointerException::new);
        user.updateUserNickname(userSignUpRequest.getUserNickname());
        user.updateUserRole();
        user.updateUserRefreshToken(jwtProvider.createRefreshToken());
        return userRepository.save(user);
    }

    public Boolean checkEmail(String userEmail) {
        return null;
    }

    public Long checkNickname(String userNickname) {
        return userRepository.countUserByUserNickname(userNickname);
    }
}

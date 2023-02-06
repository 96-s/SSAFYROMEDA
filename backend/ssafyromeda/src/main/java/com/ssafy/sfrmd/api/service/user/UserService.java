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
        User user = userRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        user.updateUserRefreshToken(jwtProvider.createRefreshToken());
        return userRepository.save(user);
    }
    public User signUpUser(UserSignUpRequest userSignUpRequest) {
        User user=userRepository.findByUserNo(userSignUpRequest.getUserNo()).orElseThrow(NullPointerException::new);
        user.updateUserNickname(userSignUpRequest.getUserNickname());
        user.updateUserRole();
        user.updateUserRefreshToken(jwtProvider.createRefreshToken());
        return userRepository.save(user);
    }

    public User signOutUser(Long userNo) {
        User user = userRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        user.updateUserRefreshToken(null);
        return userRepository.save(user);
    }

    public Long checkNickname(String userNickname) {
        return userRepository.countUserByUserNickname(userNickname);
    }
}

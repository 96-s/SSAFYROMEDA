package com.ssafy.sfrmd.service.user;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.dto.user.UserSignUpRequest;
import com.ssafy.sfrmd.dto.user.UserSignUpResponse;
import com.ssafy.sfrmd.jwt.JwtProvider;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService{
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public User sighUpUser(UserSignUpRequest userSignUpRequest) {
        User user=userRepository.findByUserEmail(userSignUpRequest.getUserEmail()).orElseThrow(NullPointerException::new);
        user.updateUserNickname(userSignUpRequest.getUserNickname());
        user.updateUserRole();
        user.updateUserRefreshToken(jwtProvider.createRefreshToken());
        return userRepository.save(user);
    }

    public Boolean checkEmail(String userEamil) {
        return null;
    }

    public Long checkNickname(String userNickname) {
        return userRepository.countUserByUserNickname(userNickname);
    }
}

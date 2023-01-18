package com.ssafy.sfrmd.service.user;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.domain.user.UserRepository;
import com.ssafy.sfrmd.dto.user.UserSignUpDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Override
    public User sighUpUser(UserSignUpDto userSignUpDto) {
        User user = User.builder()
            .userEmail(userSignUpDto.getUserEmail())
            .userNickname(userSignUpDto.getUserNickName())
            .build();
        return userRepository.save(user);
    }

    @Override
    public Boolean checkEmail(String userEamil) {
        return null;
    }

    @Override
    public Boolean checkNickname(String userNickname) {
        return null;
    }
}

package com.ssafy.sfrmd.service.user;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.dto.user.UserSignUpDto;

public interface UserService {
    User sighUpUser(UserSignUpDto userSignUpDto);
    Boolean checkEmail(String userEamil);
    Boolean checkNickname(String userNickname);
}

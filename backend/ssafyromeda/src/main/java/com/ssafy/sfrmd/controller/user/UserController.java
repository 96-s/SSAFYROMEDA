package com.ssafy.sfrmd.controller.user;

import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.dto.user.UserSignUpResponse;
import com.ssafy.sfrmd.jwt.JwtProvider;
import com.ssafy.sfrmd.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> sighUpUser(@RequestBody UserSignUpResponse userSignUpDto){
        User user = userService.sighUpUser(userSignUpDto);
        UserSignUpResponse userSignUpResponse = new UserSignUpResponse().builder()
            .userEmail(user.getUserEmail())
            .userNickName(user.getUserNickname())
            .accessToken(jwtProvider.createAccessToken(user.getUserEmail()))
            .refreshToken(user.getUserRefreshToken())
            .build();
        return new ResponseEntity<>(userSignUpResponse, HttpStatus.valueOf(200));
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(@RequestParam("nickname") String userNickname){
        if(userService.checkNickname(userNickname)==0){
            return new ResponseEntity<>("닉네임 사용 가능", HttpStatus.valueOf(200));
        }else{
            return new ResponseEntity<>("닉네임 중복", HttpStatus.valueOf(400));
        }
    }
    @GetMapping("/jwt-test")
    public ResponseEntity<String> jwtTest() {
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

}

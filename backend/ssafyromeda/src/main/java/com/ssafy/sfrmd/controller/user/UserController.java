package com.ssafy.sfrmd.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.dto.user.UserSignUpDto;
import com.ssafy.sfrmd.security.oauth.OAuthAttributes;
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

    @PostMapping("/signup")
    public ResponseEntity<?> sighUpUser(@RequestBody UserSignUpDto userSignUpDto){
        User user = userService.sighUpUser(userSignUpDto);
        return new ResponseEntity<>("회원 정보 등록 성공", HttpStatus.valueOf(200));
//        if(!userService.checkEmail(userEmail)){
//            return new ResponseEntity<>("중복된 이메일", HttpStatus.valueOf(400));
//        }else if(!userService.checkNickname(userNickname)){
//            return new ResponseEntity<>("중복된 닉네임", HttpStatus.valueOf(400));
//        }else{
//            User user = userService.sighUpUser(userSignUpDto);
//            return new ResponseEntity<>("회원 정보 등록 성공", HttpStatus.valueOf(200));
//        }
    }

    @GetMapping("/check/nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String userEmail){
        if(userService.checkNickname(userEmail)==0){
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

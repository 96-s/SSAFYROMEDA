package com.ssafy.sfrmd.api.controller.user;

import com.ssafy.sfrmd.api.domain.history.History;
import com.ssafy.sfrmd.api.domain.user.User;
import com.ssafy.sfrmd.api.dto.user.UserSignUpRequest;
import com.ssafy.sfrmd.api.dto.user.UserSignUpResponse;
import com.ssafy.sfrmd.api.service.history.HistoryService;
import com.ssafy.sfrmd.jwt.JwtProvider;
import com.ssafy.sfrmd.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final HistoryService historyService;
    private final JwtProvider jwtProvider;

    @GetMapping("/{no}")
    public ResponseEntity<?> getUser(@PathVariable("no") Long userNo){
        User user = userService.getUser(userNo);
        History history = historyService.getHistory(userNo);
        UserSignUpResponse userSignUpResponse = new UserSignUpResponse().builder()
            .userNo(user.getUserNo())
            .userEmail(user.getUserEmail())
            .userNickname(user.getUserNickname())
            .accessToken(jwtProvider.createAccessToken(user))
            .historyPlayCount(history.getHistoryPlayCount())
            .historyWinCount(history.getHistoryWinCount())
            .historyLoseCount(history.getHistoryLoseCount())
            .build();
        return new ResponseEntity<>(userSignUpResponse, HttpStatus.valueOf(200));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody UserSignUpRequest userSignUpRequest){
        if(userService.checkNickname(userSignUpRequest.getUserNickname())==0){
            userService.signUpUser(userSignUpRequest);
            return new ResponseEntity<>("회원 정보 등록 성공", HttpStatus.valueOf(200));
        }else{
            return new ResponseEntity<>("중복된 닉네임입니다.", HttpStatus.valueOf(400));
        }
    }
    @PutMapping("/signout/{no}")
    public ResponseEntity<String> signOutUser(@PathVariable("no") Long userNo) {
        if(userService.signOutUser(userNo).getUserRefreshToken()==null){
            return new ResponseEntity<>("signOut 성공", HttpStatus.valueOf(200));
        }else{
            return new ResponseEntity<>("signOut 실패", HttpStatus.valueOf(400));
        }
    }

}

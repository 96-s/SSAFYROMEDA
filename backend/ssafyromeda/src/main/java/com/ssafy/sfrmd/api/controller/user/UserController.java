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

    @PostMapping("/signup")
    public ResponseEntity<?> sighUpUser(@RequestBody UserSignUpRequest userSignUpRequest){
        User user = userService.sighUpUser(userSignUpRequest);
        History history = historyService.getHistory(user.getUserNo());
        UserSignUpResponse userSignUpResponse = new UserSignUpResponse().builder()
            .userNo(user.getUserNo())
            .userEmail(user.getUserEmail())
            .userNickname(user.getUserNickname())
            .accessToken(jwtProvider.createAccessToken(user))
            .refreshToken(user.getUserRefreshToken())
            .historyPlayCount(history.getHistoryPlayCount())
            .historyWinCount(history.getHistoryWinCount())
            .historyLoseCount(history.getHistoryLoseCount())
            .build();
        return new ResponseEntity<>(userSignUpResponse, HttpStatus.valueOf(200));
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable("nickname") String userNickname){
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

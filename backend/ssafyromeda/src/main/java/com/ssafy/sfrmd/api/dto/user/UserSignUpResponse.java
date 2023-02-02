package com.ssafy.sfrmd.api.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSignUpResponse {

    private Long userNo;
    private String userEmail;
    private String userNickname;
    private String accessToken;
    private String refreshToken;
    private int historyPlayCount;
    private int historyWinCount;
    private int historyLoseCount;


    @Builder
    public UserSignUpResponse(Long userNo, String userEmail, String userNickname,
        String accessToken, String refreshToken, int historyPlayCount, int historyWinCount,
        int historyLoseCount) {
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.historyPlayCount = historyPlayCount;
        this.historyWinCount = historyWinCount;
        this.historyLoseCount = historyLoseCount;
    }
}

package com.ssafy.sfrmd.execption;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// 작성 중입니다.
@RestControllerAdvice
public class ConnectRoomExecption {
    @ExceptionHandler(NullPointerException.class)
    public String illegalArgumentExceptionAdvice(NullPointerException e) {
        return "데이터가 비어있습니다!";
    }
}

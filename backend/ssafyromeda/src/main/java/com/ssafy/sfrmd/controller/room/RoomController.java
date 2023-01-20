package com.ssafy.sfrmd.controller.room;

import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.service.room.RoomService;
import com.ssafy.sfrmd.service.room.RoomServiceImpl;
import com.ssafy.sfrmd.service.user.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {

    @Autowired
    UserServiceImpl userService;
    @Autowired
    RoomServiceImpl roomService;
    @PostMapping
    public ResponseEntity<? extends Object> createRoom(){
        Room room= roomService.createRoom(1);

        if(room.getRoomSeq() != null){
            return new ResponseEntity<>(room, HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatus.valueOf(400));
    }
}

package com.ssafy.sfrmd.controller.room;

import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.service.room.RoomServiceImpl;
import com.ssafy.sfrmd.service.user.UserServiceImpl;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
@RequiredArgsConstructor
public class RoomController {
    private final UserServiceImpl userService;

    private final RoomServiceImpl roomService;

    @PostMapping
    public ResponseEntity<? extends Object> createRoom(){
        Room room= roomService.createRoom(1);

        if(room.getRoomSeq() != null){
            return new ResponseEntity<>(room, HttpStatus.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatus.valueOf(400));
    }

    @PutMapping("/update/{roomCode}")
    public ResponseEntity<? extends Object> updateRoom(@PathVariable("roomCode") String roomCode, @RequestParam(required = false) Long userNo){

        boolean res = roomService.updateRoom(roomCode, userNo);

        if(res){
            return new ResponseEntity<>(" 방 업데이트 성공", HttpStatus.valueOf(200));
        }
        else{
            return new ResponseEntity<>(" 방이 존재하지 않음", HttpStatus.valueOf(400));
        }
    }

    @DeleteMapping("/delete/{roomCode}")
    public ResponseEntity<? extends Object> deleteRoom(@PathVariable("roomCode") String roomCode){

        // 삭제할 방이 존재하는지 확인
        Optional<Room> deleteRoom;
        try {
            deleteRoom = roomService.getRoomByRoomCode(roomCode);
        }catch (Exception e){
            return new ResponseEntity<>(roomCode+" 방 정보가 없음", HttpStatus.valueOf(404));
        }

        // 삭제할 방의 roomSeq 가져오기
        Long roomSeq=deleteRoom.get().getRoomSeq();

        // 삭제하기
        if(roomService.deleteRoom(roomSeq, roomCode)){
            return new ResponseEntity<>(roomCode+" 방 삭제 성공", HttpStatus.valueOf(200));
        }
        else{
            return new ResponseEntity<>(roomCode+" 방 삭제 실패", HttpStatus.valueOf(405));
        }
    }
}

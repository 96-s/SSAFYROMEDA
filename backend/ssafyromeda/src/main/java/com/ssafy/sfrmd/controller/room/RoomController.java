package com.ssafy.sfrmd.controller.room;

import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.domain.user.User;
import com.ssafy.sfrmd.service.room.RoomServiceImpl;
import com.ssafy.sfrmd.service.user.UserService;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
@RequiredArgsConstructor
public class RoomController {

    @Value("http://i8d205.p.ssafy.io:4443/")
    private String OPENVIDU_URL;
    @Value("MY_SECRET")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;
    private final UserService userService;
    private final RoomServiceImpl roomService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping
    public ResponseEntity<? extends Object> createRoom(@RequestBody User user)
        throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Room> params = new HashMap<>();

        Room room=null;
        params.put("room", room);

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        room = roomService.createRoom(user.getUserNo(), session.getSessionId());

        if (room.getRoomSeq() != null) {
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.valueOf(400));
    }

    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
        @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<? extends Object> createRoom(){
//        Room room= roomService.createRoom(1);
//
//        if(room.getRoomSeq() != null){
//            return new ResponseEntity<>(room, HttpStatus.valueOf(200));
//        }
//        return new ResponseEntity<>(null, HttpStatus.valueOf(400));
//    }

//    @PutMapping("/update/{roomCode}")
//    public ResponseEntity<? extends Object> updateRoom(@PathVariable("roomCode") String roomCode, @RequestParam(required = false) Long userNo){
//
//        boolean res = roomService.updateRoom(roomCode, userNo);
//
//        if(res){
//            return new ResponseEntity<>(" 방 업데이트 성공", HttpStatus.valueOf(200));
//        }
//        else{
//            return new ResponseEntity<>(" 방이 존재하지 않음", HttpStatus.valueOf(400));
//        }
//    }

    @DeleteMapping("/delete/{roomCode}")
    public ResponseEntity<? extends Object> deleteRoom(@PathVariable("roomCode") String roomCode){

        // 삭제할 방이 존재하는지 확인
        Optional<Room> deleteRoom = roomService.getRoomByRoomCode(roomCode);
        if(deleteRoom.isEmpty()) {
            return new ResponseEntity<>(roomCode + " 방 정보가 없음", HttpStatus.valueOf(404));
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

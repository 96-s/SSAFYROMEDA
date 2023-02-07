package com.ssafy.sfrmd.api.controller.room;

import com.ssafy.sfrmd.api.domain.room.Room;
import com.ssafy.sfrmd.api.domain.room.RoomRedis;
import com.ssafy.sfrmd.api.domain.room.RoomRedisRepository;
import com.ssafy.sfrmd.api.domain.user.User;
import com.ssafy.sfrmd.api.dto.room.RoomConnectRequest;
import com.ssafy.sfrmd.api.service.room.RoomService;
import com.ssafy.sfrmd.api.service.user.UserService;
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
import java.util.Random;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
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

    @Value("https://i8d205.p.ssafy.io")
    private String OPENVIDU_URL;
    @Value("ssafyromeda")
    private String OPENVIDU_SECRET;
    private OpenVidu openvidu;
    private final UserService userService;
    private final RoomService roomService;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @PostMapping
    public ResponseEntity<?> createRoom()
        throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> params = new HashMap<>();
        String roomCode = roomService.makeRoomCode();
        params.put("customSessionId", roomCode);

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.valueOf(200));
    }


    @PostMapping("/connect/{sessionId}")
    public ResponseEntity<?> connectRoom(@PathVariable("sessionId") String sessionId, @RequestBody RoomConnectRequest roomConnectRequest)
        throws OpenViduJavaClientException, OpenViduHttpException {

        roomService.connectRoom(roomConnectRequest);
        //redis에 입장 정보 저장

        Map<String, Object> params = new HashMap<>();
        params.put("userNo", roomConnectRequest.getUserNo());
        params.put("userNickname", roomConnectRequest.getUserNickname());

        Session session = openvidu.getActiveSession(sessionId);//sessionId
        if (session != null) {
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);

            return new ResponseEntity<>(connection.getToken(), HttpStatus.valueOf(200));
        }else{
            return new ResponseEntity<>("세션 정보 ", HttpStatus.valueOf(400));
        }
    }

    @DeleteMapping("/{roomCode}")
    public ResponseEntity<?> deleteRoom(@PathVariable("roomCode") String roomCode){
        roomService.deleteRoom(roomCode);
        //redis에서 해당 방 코드 정보 모두 삭제
        return new ResponseEntity<>("방 삭제 성공", HttpStatus.valueOf(200));
    }
}

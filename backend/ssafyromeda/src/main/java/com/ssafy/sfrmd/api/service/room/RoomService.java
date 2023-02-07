package com.ssafy.sfrmd.api.service.room;

import com.ssafy.sfrmd.api.domain.player.Player;
import com.ssafy.sfrmd.api.domain.player.PlayerRepository;
import com.ssafy.sfrmd.api.domain.room.Room;
import com.ssafy.sfrmd.api.domain.room.RoomRepository;
import com.ssafy.sfrmd.api.dto.room.RoomConnectRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private final PlayerRepository playerRepository;

//    HashSet<String> roomCodeSet=new HashSet<>(); // 방코드 set

    public String makeRoomCode() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit,rightLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
        return generatedString;
    }

    public Room connectRoom(RoomConnectRequest roomConnectRequest) {
        Room room=roomRepository.findByRoomCode(roomConnectRequest.getRoomCode()).orElseGet(()->createRoom(roomConnectRequest));
        room.updateRoomCount();
        return roomRepository.save(room);

        // host 정보 저장(일단 보류)
//        Player player = new Player();
//        player.setUserNo(host);
//        player.setRoomCode(roomCode);
//        playerRepository.save(player);
    }

    public Room createRoom(RoomConnectRequest roomConnectRequest){
        return roomRepository.save(Room.builder()
            .roomCode(roomConnectRequest.getRoomCode())
            .roomHost(roomConnectRequest.getUserNo())
            .roomCount(0).build());
    }

    public Room getRoomByRoomCode(String roomCode) {
        return roomRepository.findByRoomCode(roomCode).orElseThrow(NullPointerException::new);
    }


//    public boolean deleteRoom(Long roomSeq) {
//        try{
//            roomRepository.deleteById(roomSeq);
//            return true;
//        }catch (Exception e){
//            return false;
//        }
//    }


}

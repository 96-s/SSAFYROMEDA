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
import org.springframework.stereotype.Service;

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

    public void createConnection(RoomConnectRequest roomConnectRequest, String roomCode) {
        Room room = Room.builder()
            .roomCode(roomCode)
            .roomHost(roomConnectRequest.getUserNo())
            .roomCount(1)
            .build();
        roomRepository.save(room);

        // host 정보 저장(일단 보류)
//        Player player = new Player();
//        player.setUserNo(host);
//        player.setRoomCode(roomCode);
//        playerRepository.save(player);

    }

    public boolean updateRoom(String roomCode, Long userNo){
        // 방 DB에 인원수 추가
        try{
            Room updateRoom=roomRepository.findByRoomCode(roomCode).orElseThrow(NullPointerException::new);
            updateRoom.updateRoomNo();

            roomRepository.save(updateRoom);

            return true;
        }catch (Exception e){
            return false;
        }
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

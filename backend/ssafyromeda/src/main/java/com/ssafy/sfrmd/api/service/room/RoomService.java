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

import com.ssafy.sfrmd.api.dto.room.RoomCreateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public Room connectRoom(RoomConnectRequest roomConnectRequest) {
        Room room=roomRepository.findByRoomCode(roomConnectRequest.getRoomCode()).orElseThrow(NullPointerException::new);
        room.updateRoomCount();
        return roomRepository.save(room);
    }

    public String createRoom(RoomCreateRequest roomCreateRequest){
        String roomCode = makeRoomCode();
        roomRepository.save(Room.builder()
            .roomCode(roomCode)
            .roomHost(roomCreateRequest.getUserNo())
            .roomCount(1).build());

        return roomCode;
    }

    public void deleteRoom(String roomCode){
        roomRepository.delete(roomRepository.findByRoomCode(roomCode).orElseThrow(NullPointerException::new));
    }


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

}

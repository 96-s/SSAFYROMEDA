package com.ssafy.sfrmd.service.room;

import com.ssafy.sfrmd.domain.player.Player;
import com.ssafy.sfrmd.domain.player.PlayerRepository;
import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.domain.room.RoomRepository;
import java.util.HashSet;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    PlayerRepository playerRepository;

    HashSet<String> roomCodeSet=new HashSet<>(); // 방코드 set

    @Override
    public Room createRoom(long host) {

        // 방코드 생성
        String roomCode;
        Random random = new Random();
        do {
                roomCode = random.ints(48, 122 + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(10)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        }while(roomCodeSet.contains(roomCode)); // 방코드 중복 검사

        roomCodeSet.add(roomCode); // set에 방코드 저장

        // room 정보 저장
        Room room = new Room();
        room.setRoomHost(host);
        room.setRoomCnt(0);
        room.setRoomCode(roomCode);

        long roomSeq = roomRepository.save(room).getRoomSeq();

        // host 정보 저장
        Player player = new Player();
        player.setRoomCode(roomCode);
        player.setUserNo(host);
        playerRepository.save(player);

        return room;

    }

    @Override
    public Optional<Room> getRoomByRoomCode(String roomCode) {
        return roomRepository.findByRoomCode(roomCode);
    }

    @Override
    public boolean deleteRoom(Long roomSeq, String roomCode) {
        try{
            roomRepository.deleteById(roomSeq);
            roomCodeSet.remove(roomCode);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}

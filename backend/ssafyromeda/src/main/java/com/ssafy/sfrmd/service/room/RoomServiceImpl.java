package com.ssafy.sfrmd.service.room;

import com.ssafy.sfrmd.domain.player.Player;
import com.ssafy.sfrmd.domain.player.PlayerRepository;
import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.domain.room.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public boolean createRoom(long host) {
        try {
            // room 정보 초기화
            Room room = new Room();
            room.setRoomHost(host); // user_no
            room.setRoomCnt(0);
            long roomCode = roomRepository.save(room).getRoomCode();

            // host 정보 저장
            Player player = new Player();
            player.setRoomCode(roomCode);
            player.setUserNo(host); // user_no
            playerRepository.save(player);

            return true;
        }catch(Exception e){
            return false;
        }
    }
}

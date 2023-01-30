package com.ssafy.sfrmd.service.room;

import com.ssafy.sfrmd.domain.player.Player;
import com.ssafy.sfrmd.domain.player.PlayerRepository;
import com.ssafy.sfrmd.domain.room.Room;
import com.ssafy.sfrmd.domain.room.RoomRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("roomService")
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{
    private final RoomRepository roomRepository;

    private final PlayerRepository playerRepository;

//    HashSet<String> roomCodeSet=new HashSet<>(); // 방코드 set

    @Override
    public Room createRoom(long host, String roomCode) {

        // room 정보 저장
        Room room = new Room();
        room.setRoomHost(host);
        room.setRoomCnt(1);

        long roomSeq = roomRepository.save(room).getRoomSeq();

        // host 정보 저장
        Player player = new Player();
        player.setUserNo(host);
        player.setRoomCode(roomCode);
        playerRepository.save(player);

        return room;
    }

    public boolean updateRoom(String roomCode, Long userNo){
        // 방 DB에 인원수 추가
        try{
            Optional<Room> updateRoom=roomRepository.findByRoomCode(roomCode);

            int cnt=updateRoom.get().getRoomCnt();
            updateRoom.get().setRoomCnt(++cnt);

            roomRepository.save(updateRoom.get());

            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Optional<Room> getRoomByRoomCode(String roomCode) {
        return roomRepository.findByRoomCode(roomCode);
    }

    @Override
    public boolean deleteRoom(Long roomSeq, String roomCode) {
        try{
            roomRepository.deleteById(roomSeq);
//            roomCodeSet.remove(roomCode);

            return true;
        }catch (Exception e){
            return false;
        }
    }


}

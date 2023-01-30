package com.ssafy.sfrmd.service.room;

import com.ssafy.sfrmd.domain.room.Room;
import java.util.Optional;

public interface RoomService {
    Room createRoom(long host, String roomCode);

    boolean updateRoom(String roomCode, Long userNo);

    Optional<Room> getRoomByRoomCode(String roomCode);

    boolean deleteRoom(Long roomSqe, String roomCode);

}

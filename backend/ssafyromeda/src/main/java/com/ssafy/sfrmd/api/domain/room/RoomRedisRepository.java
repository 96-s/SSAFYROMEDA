package com.ssafy.sfrmd.api.domain.room;

import java.util.Optional;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

@EnableRedisRepositories
public interface RoomRedisRepository extends CrudRepository<RoomRedis, String> {
    Optional<RoomRedis> findByRoomCode(String roomCode);
}

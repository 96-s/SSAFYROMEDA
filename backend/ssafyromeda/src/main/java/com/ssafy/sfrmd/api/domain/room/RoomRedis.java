package com.ssafy.sfrmd.api.domain.room;

import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("game")
public class RoomRedis {
    @Id
    String roomCode;
    String roomHost;
    int t1Pos;
    int t2Pos;
    String[] players;

    @Builder
    public RoomRedis(String roomCode, String roomHost, int t1Pos, int t2Pos, String[] players)
    {
        this.roomCode = roomCode;
        this.roomHost = roomHost;
        this.t1Pos = t1Pos;
        this.t2Pos = t2Pos;
        this.players = players;
    }
}

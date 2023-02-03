package com.ssafy.sfrmd.api.domain.room;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "room")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table
// 방 정보
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_no") // 방 auto_increment
    private Long roomNo;

    @Column(name = "room_code") // 방 코드
    private String roomCode;

    @Column(name = "room_host") // 방장
    private long roomHost;

    @Column(name = "room_count") // 방 인원
    private int roomCount;

    @Builder
    public Room(String roomCode, Long roomHost, int roomCount) {
        this.roomCode = roomCode;
        this.roomHost = roomHost;
        this.roomCount = roomCount;
    }

    public void updateRoomNo() {
        this.roomCount += 1;
    }

}

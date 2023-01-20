package com.ssafy.sfrmd.domain.room;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="room")
// 방 정보
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_seq") // 방 auto_increment
    private Long roomSeq;

    @Column(name="room_code") // 방 코드
    private String roomCode;

    @Column(name="room_host") // 방장
    private long roomHost;

    @Column(name="room_cnt") // 방 인원
    private int roomCnt;

}

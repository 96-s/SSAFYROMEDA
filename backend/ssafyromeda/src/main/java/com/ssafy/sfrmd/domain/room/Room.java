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
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_code")
    private Long roomCode;

    @Column(name="room_host")
    private long roomHost;

    @Column(name="room_cnt")
    private int roomCnt;

}

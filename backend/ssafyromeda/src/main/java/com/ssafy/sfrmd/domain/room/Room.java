package com.ssafy.sfrmd.domain.room;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Room {

    @Id
    @Column(name="room_id")
    private String roomId;

    @Column(name="room_host")
    private int roomHost;

    @Column(name="room_cnt")
    private int roomCnt;

}

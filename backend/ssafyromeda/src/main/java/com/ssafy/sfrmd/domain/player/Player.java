package com.ssafy.sfrmd.domain.player;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Player {

    //게임 참여자 no (pk)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 생성
    @Column(name="player_no")
    private Long playerNo;

    @Column(name="room_code") // 방코드
    private Long roomCode;

    @Column(name="user_no") // 유저 고유 no(user pk key)
    private Long userNo;

}

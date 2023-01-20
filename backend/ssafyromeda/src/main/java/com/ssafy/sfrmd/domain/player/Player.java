package com.ssafy.sfrmd.domain.player;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
// 게임 참여자 정보
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="player_no") // 플레이어 auto_increment
    private Long playerNo;

    @Column(name="room_code") // 방코드
    private String roomCode;

    @Column(name="user_no") // 유저 고유 번호
    private Long userNo;

}

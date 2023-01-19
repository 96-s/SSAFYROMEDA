package com.ssafy.sfrmd.domain.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerEntity extends JpaRepository<Player, Long> {

}

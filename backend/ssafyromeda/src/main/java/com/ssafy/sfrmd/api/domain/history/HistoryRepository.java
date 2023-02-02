package com.ssafy.sfrmd.api.domain.history;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long>{
    Optional<History> findByUserNo(Long userNo);
}

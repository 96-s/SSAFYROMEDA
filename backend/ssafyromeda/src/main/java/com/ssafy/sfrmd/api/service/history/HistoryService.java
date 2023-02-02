package com.ssafy.sfrmd.api.service.history;

import com.ssafy.sfrmd.api.domain.history.History;
import com.ssafy.sfrmd.api.domain.history.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HistoryService {
    private final HistoryRepository historyRepository;

    public History getHistory(Long userNo){
        return historyRepository.findByUserNo(userNo).orElse(createHistory(userNo));
    }

    private History createHistory(Long userNo) {
        History history = History.builder()
            .userNo(userNo)
            .historyPlayCount(0)
            .historyWinCount(0)
            .historyLoseCount(0).build();
        return historyRepository.save(history);
    }
    
}

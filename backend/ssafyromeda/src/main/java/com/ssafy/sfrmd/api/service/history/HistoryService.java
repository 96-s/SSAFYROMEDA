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
        return historyRepository.save(new History(userNo, 0, 0, 0));
    }

    public History updateHistoryWinCount(Long userNo){
        History history = historyRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        history.updateHistoryPlayCount();
        history.updateHistoryWinCount();
        return historyRepository.save(history);
    }

    public History updateHistoryLoseCount(Long userNo){
        History history = historyRepository.findByUserNo(userNo).orElseThrow(NullPointerException::new);
        history.updateHistoryPlayCount();
        history.updateHistoryLoseCount();
        return historyRepository.save(history);
    }
}

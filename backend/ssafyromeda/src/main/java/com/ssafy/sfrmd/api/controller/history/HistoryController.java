package com.ssafy.sfrmd.api.controller.history;

import com.ssafy.sfrmd.api.domain.history.History;
import com.ssafy.sfrmd.api.dto.history.HistoryUpdateResponse;
import com.ssafy.sfrmd.api.service.history.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    @PutMapping("/win/{no}")
    public ResponseEntity<?> updateHistoryWinCount(@PathVariable("no")long userNo){
        History history = historyService.updateHistoryWinCount(userNo);
        HistoryUpdateResponse historyUpdateResponse = HistoryUpdateResponse.builder()
            .historyPlayCount(history.getHistoryPlayCount())
            .historyWinCount(history.getHistoryWinCount())
            .historyLoseCount(history.getHistoryLoseCount())
            .build();
        return new ResponseEntity<>(historyUpdateResponse, HttpStatus.valueOf(200));
    }

}

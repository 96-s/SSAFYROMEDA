package com.ssafy.sfrmd.api.dto.history;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HistoryUpdateResponse {

    private int historyPlayCount;
    private int historyWinCount;
    private int historyLoseCount;

    @Builder
    public HistoryUpdateResponse(int historyPlayCount, int historyWinCount, int historyLoseCount) {
        this.historyPlayCount = historyPlayCount;
        this.historyWinCount = historyWinCount;
        this.historyLoseCount = historyLoseCount;
    }
}

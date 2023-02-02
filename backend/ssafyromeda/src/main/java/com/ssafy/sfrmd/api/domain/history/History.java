package com.ssafy.sfrmd.api.domain.history;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long userNo;

    @Column(name = "history_play_count")
    private int historyPlayCount;
    @Column(name = "history_win_count")
    private int historyWinCount;
    @Column(name = "history_lose_count")
    private int historyLoseCount;

    @Builder
    public History(Long userNo, int historyPlayCount, int historyWinCount, int historyLoseCount) {
        this.userNo = userNo;
        this.historyPlayCount = historyPlayCount;
        this.historyWinCount = historyWinCount;
        this.historyLoseCount = historyLoseCount;
    }

    public void updateHistoryPlayCount() {
        this.historyPlayCount += 1;
    }

    public void updateHistoryWinCount() {
        this.historyWinCount += 1;
    }

    public void updateHistoryLoseCount() {
        this.historyLoseCount += 1;
    }
}
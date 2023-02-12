import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const GameFlow = ({
  mySessionId,
  subscribers, // 자신을 제외한 게임 내 참여자(구독자), array
  t1Pos, // 팀 1 현재 위치, int
  t2Pos, // 팀 2 현재 위치, int
  myGameNo, // 게임 내 고유 번호, int
  isHostPlayer, // 방장인지 아닌지, bool
  nextThrowUser, // 주사위 던지는 유저, int
  setIsDiceThrow, // 내가 주사위 던지는지 여부, bool
  myTeam, // 내 팀 ??
  gameTurn, // 이번 턴에 게임 진행하는 여부, bool
  team1Members, // 우리 팀원들 (자신 제외), array
  team2Members, // 상대 팀원들, array
}) => {
  const { startAnimationPlaying, setStartAnimationPlaying } = useState(false);
  const { diceTurn, setDiceTurn } = useState(false);
  const { diceResult, setDiceResult } = useState(0);

  // 게임 시작 버튼을 통해 이벤트 받을 때 ----help
  const gameFlowStart = (event) => {
    if (isHostPlayer) {
      sendGameResetSignal(subscribers);
    }
    setStartAnimationPlaying(true); // 게임 시작 에니메이션 트리거 ON
  };

  // 게임 시작 애니메이션 로직
  useEffect(() => {
    if (startAnimationPlaying) {
      console.warn("게임 시작 애니메이션 실행!");
      /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(?)) (setStartAnimationPlaying(true); 처리)------------------ / ----help */
    } else if (!startAnimationPlaying) {
      console.warn("게임 시작 애니메이션 종료!");
      checkDiceTurn();
    }
  }, [startAnimationPlaying]);

  // 자신의 주사위 턴인지 확인
  const checkDiceTurn = () => {
    if (myGameNo === nextThrowUser) {
      setIsDiceThrow(true); // 다음에 주사위를 던짐
    } else if (myGameNo !== nextThrowUser) {
      setIsDiceThrow(false); // 다음에 주사위를 안 던짐
    }
  };

  // 주사위 권한이 변경되면 주사위 턴으로 진입
  useEffect(() => {
    setDiceTurn(true);
  }, [isDiceThrow]);

  // 주사위 턴 전환 로직
  useEffect(() => {
    if (diceTurn) {
      console.warn("주사위 턴 시작!");
      startDiceTurn();
    } else if (!diceTurn) {
      endDiceTurn();
      console.warn("주사위 턴 종료!");
    }
  }, [diceTurn]);

  // 주사위 턴 시작 트리거
  const startDiceTurn = () => {
    if (isDiceThrow) {
      console.log("당신이 던질 차례입니다.");
      setDiceResult(
        0
      ); /* ---주사위 수 로직 '0' 대신에 삽입(setTimeOut(?)) setDiceTurn(false);로 주사위 턴 종료 --- / ----help */
    } else if (!isDiceThrow) {
      console.log("당신이 던질 차례가 아닙니다.");
      /* --------------대기 중... 애니메이션? 모달? 삽입------------------ / ----help */
    }
  };

  // 주사위가 던져저서 숫자가 변하면 발동
  useEffect(() => {
    if (diceResult > 0) {
      console.log(`주사위 숫자 : ${diceResult}`);
      if (myTeam === 1) setT1Pos(t1Pos + diceResult);
      else if (myTeam === 2) setT2Pos(t2Pos + diceResult);
    } else if (diceResult === 0) {
      endDiceTurn();
      console.warn("주사위 턴 종료!");
    }
  }, [diceResult]);

  useEffect(() => {
    if (diceTurn) {
      sendPos(subscribers);
      // setDiceResult(0);
    }
  }, [t1Pos, t2Pos]);

  const endDiceTurn = () => {
    if (isDiceThrow) {
      console.log("당신이 던질 차례 입니다.");
      diceResult = 0; /* -----------주사위 수 로직 '0' 대신에 삽입(setTimeOut(?)) diceTurn = false; 로 전환 ------- / ----help */
    } else if (!isDiceThrow) {
      console.log("당신이 던질 차례가 아닙니다.");
      /* --------------대기 중... 애니메이션 삽입------------------ / ----help */
    }
  };

  // 게임 시작 전, 후 상태 초기화를 위해
  const sendGameResetSignal = async (subscribers) => {
    console.log("게임 리셋!");
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: mySessionId,
        to: subscribers,
        type: "GAME_RESET",
        data: {
          reset: true,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    return response.data;
  };

  // 변화한 위치 정보를 보내는 함수
  const sendPos = async (subscribers) => {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: mySessionId,
        to: subscribers,
        type: "TURN_UPDATE",
        data: {
          t1Pos: t1Pos,
          t2Pos: t2Pos,
          nextThrowUser: nextThrowUser,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    console.log("위치 전송함");
    return response.data;
  };
};
export default GameFlow;

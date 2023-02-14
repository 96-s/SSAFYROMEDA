import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";
import MyButton from "components/common/MyButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 20px;
`;

const Page = styled.div`
  height: 100%;
  width: 100%;
`;

const GameStartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  height: 85vh;
  color: white;
`;

const GameFlow = ({
  mainStreamManager,
  publisher,
  mySessionId,
  subscribers, // 자신을 제외한 게임 내 참여자(구독자), array
  setT1Pos,
  setT2Pos,
  t1Pos, // 팀 1 현재 위치, int
  t2Pos, // 팀 2 현재 위치, int
  myGameNo, // 게임 내 고유 번호, int
  isHostPlayer, // 방장인지 아닌지, bool
  setNextThrowUser,
  nextThrowUser, // 주사위 던지는 유저, int
  setIsDiceThrow, // 내가 주사위 던지는지 여부, bool
  isDiceThrow,
  myTeam, // 내 팀 ??
  userNickname,
  userNo,
  gameTurn, // 이번 턴에 게임 진행하는 여부, bool
  setGameTurn,
  team1Members, // 우리 팀원들 (자신 제외), array
  team2Members, // 상대 팀원들, array
  nextMiniGameNum,
  setNextMiniGameNum,
  miniGameSelectTurn,
  setMiniGameSelectTurn,
  miniGame1,
  setMiniGame1,
  miniGame2,
  setMiniGame2,
  miniGame3,
  setMiniGame3,
  miniGame4,
  setMiniGame4,
  miniGame5,
  setMiniGame5,
  isGameStarted,
  setIsGameStarted,
}) => {
  const [startAnimationPlaying, setStartAnimationPlaying] = useState(false);
  const [diceTurn, setDiceTurn] = useState(false);
  const [diceResult, setDiceResult] = useState(0);

  // 게임 시작 버튼을 통해 이벤트 받을 때 ----help
  const gameFlowStart = (event) => {
    if (isHostPlayer) {
      setIsGameStarted(true);
      setTimeout(() => {
        sendGameStartSignal(); // setStartAnimationPlaying(true); 쏘기
      }, 1000);
      posReset(); // 내 포지션도 리셋
    }
    setStartAnimationPlaying(true); // 게임 시작 에니메이션 트리거 ON
  };

  // 포지션 리셋
  const posReset = () => {
    setT1Pos(0);
    setT1Pos(0);
    setNextThrowUser(0);
  };

  // 게임 시작 로직
  useEffect(() => {
    if (startAnimationPlaying) {
      console.warn("게임 시작 애니메이션 실행!");
      /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(?)) (setStartAnimationPlaying(false); 처리)------------------ / ----help */
    }
  }, [startAnimationPlaying]);

  // 게임 시작 애니메이션 로직
  useEffect(() => {
    if (!startAnimationPlaying) {
      console.warn("게임 시작 애니메이션 종료!");
      checkDiceTurn();
    }
  }, [startAnimationPlaying]);

  // 자신의 주사위 턴인지 확인
  const checkDiceTurn = () => {
    // 초기값 0
    if (myGameNo === nextThrowUser) {
      setIsDiceThrow(true); // 다음에 주사위를 던짐
    }
  };

  // 주사위 권한이 변경되면 주사위 턴으로 진입
  useEffect(() => {
    if (isDiceThrow) {
      sendDiceTurnSignal(subscribers); // 다른 사람들 전부 주사위 턴 돌입하라고 명령
      setDiceTurn(true); // 나도 주사위 턴으로 돌입
    }
  }, [isDiceThrow]);

  // 주사위 턴 전환 로직
  useEffect(() => {
    if (diceTurn) {
      // 만약 주사위 턴이 시작이라면
      console.warn("주사위 턴 시작!");
      startDiceTurn();
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
      if (myTeam === 1) setT1Pos(t1Pos + diceResult); // 자신이 팀 1일 때
      else if (myTeam === 2) setT2Pos(t2Pos + diceResult); // 자신이 팀 2일 때
    }
  }, [diceResult]);

  useEffect(() => {
    if (!(t1Pos === 0 && t2Pos === 0)) {
      // 내가 주사위를 던진 사람이라면 바뀐 포지션을 던진다.
      if (isDiceThrow) {
        sendPos(subscribers);
        setDiceResult(0);
      }
      // 위치가 바뀌면 다이스 턴을 종료한다.
      setDiceTurn(false);
    }
  }, [t1Pos, t2Pos]);

  useEffect(() => {
    if (!diceTurn) {
      // 주사위 턴이 종료된다면
      endDiceTurn();
      console.warn("주사위 턴 종료!");
    }
  }, [diceTurn]);

  const endDiceTurn = () => {
    setGameTurn(true);
  };

  //
  useEffect(() => {
    if (gameTurn) {
      if (isHostPlayer) {
        setNextMiniGameNum(Math.floor(Math.random(1, 5) + 1));
      }
    }
  }, [gameTurn]);

  // 다음 미니게임이 정해졌을 때
  useEffect(() => {
    if (isHostPlayer && nextMiniGameNum > 0) {
      sendNextMiniGame(subscribers);
    }
    setMiniGameSelectTurn(true);
  }, [nextMiniGameNum]);

  // 미니 게임 턴이 되었을 때
  useEffect(() => {
    if (miniGameSelectTurn) {
      switch (nextMiniGameNum) {
        case 1:
          setMiniGame1(true);
          break;
        case 2:
          setMiniGame2(true);
          break;
        case 3:
          setMiniGame3(true);
          break;
        case 4:
          setMiniGame4(true);
          break;
        case 5:
          setMiniGame5(true);
          break;
      }
    }
  }, [miniGameSelectTurn]);

  const successMiniGame = () => {};
  const failMiniGame = () => {};

  // 게임 시작 전, 후 상태 초기화를 위해
  const sendGameStartSignal = () => {
    console.log("게임 리셋!");

    const sendData = {
      session: mySessionId,
      to: [], // all user
      data: JSON.stringify({
        t1Pos: t1Pos,
        t2Pos: t2Pos,
        nextThrowUser: nextThrowUser,
        isGameStarted: true,
      }),
      type: "GAME_RESET",
    };
    // console.log(JSON.stringify(sendData));
    fetch("https://i8d205.p.ssafy.io/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    // const response = await axios.post(
    //   "https://i8d205.p.ssafy.io/openvidu/api/signal",
    //   {
    //     session: mySessionId,
    //     to: subscribers,
    //     type: "GAME_RESET",
    //     data: JSON.stringify({
    //       isGameStarted: isGameStarted,
    //     }),
    //   },
    //   {
    //     withCredentials: true,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
    //     },
    //   }
    // );
    // return response.data;
  };

  const sendDiceTurnSignal = () => {
    console.log("주사위 턴 시작!");
    const sendData = {
      session: mySessionId,
      to: [], // all user
      data: JSON.stringify({
        diceTurn: true,
      }),
      type: "DICE_TURN",
    };
    // console.log(JSON.stringify(sendData));
    fetch("https://i8d205.p.ssafy.io/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    // const response = await axios.post(
    //   "https://i8d205.p.ssafy.io/openvidu/api/signal",
    //   {
    //     session: mySessionId,
    //     to: subscribers,
    //     type: "DICE_TURN",
    //     data: {
    //       diceTurn: true,
    //     },
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
    //     },
    //   }
    // );
    // return response.data;
  };

  // 변화한 위치 정보를 보내는 함수
  const sendPos = () => {

    const sendData = {
      session: mySessionId,
      to: [], // all user
      data: JSON.stringify({
        nextT1Pos: t1Pos,
        nextT2Pos: t2Pos,
        nextThrowUser: (nextThrowUser + 1) % 3,
        diceTurn: false,
      }),
      type: "POS_UPDATE",
    };
    // console.log(JSON.stringify(sendData));
    fetch("https://i8d205.p.ssafy.io/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    // const response = await axios.post(
    //   "https://i8d205.p.ssafy.io/openvidu/api/signal",
    //   {
    //     session: mySessionId,
    //     to: subscribers,
    //     type: "POS_UPDATE",
    //     data: {
    //       nextT1Pos: t1Pos,
    //       nextT2Pos: t2Pos,
    //       nextThrowUser: (nextThrowUser + 1) % 3,
    //       diceTurn: false,
    //     },
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
    //     },
    //   }
    // );
    // console.log("위치 전송함");
    // return response.data;
  };

  // 다음에 무슨 게임하는지 보내는 함수
  const sendNextMiniGame = () => {
    const sendData = {
      session: mySessionId,
      to: [], // all user
      data: JSON.stringify({
        nextGame: nextMiniGameNum,
      }),
      type: "NEXTGAME_UPDATE",
    };
    // console.log(JSON.stringify(sendData));
    fetch("https://i8d205.p.ssafy.io/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    // const response = await axios.post(
    //   "https://i8d205.p.ssafy.io/openvidu/api/signal",
    //   {
    //     session: mySessionId,
    //     to: subscribers,
    //     type: "NEXTGAME_UPDATE",
    //     data: {
    //       nextGame: nextMiniGameNum,
    //     },
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
    //     },
    //   }
    // );
    // console.log("위치 전송함");
    // return response.data;
  };

  const GameStart = () => {
    gameFlowStart();
  };

  console.log("나는 방장" + isHostPlayer);
  console.log("게임 시작함?" + isGameStarted);

  return (
    <Page>
      <Container>
        <OurTeamVid
          streamManager={mainStreamManager}
          subscribers={subscribers}
          publisher={publisher}
          team1Members={team1Members}
        />
        {isGameStarted === false ? (
          isHostPlayer !== false ? (
            <GameStartButton>
              <MyButton
                lang={"Korean"}
                text={"게임 시작"}
                type={"is-success"}
                onClick={GameStart}
              />
            </GameStartButton>
          ) : (
            <GameStartButton>
              <span>준비 중</span>
            </GameStartButton>
          )
        ) : (
          <Map
            setT1Pos={setT1Pos}
            setT2Pos={setT2Pos}
            t1Pos={t1Pos}
            t2Pos={t2Pos}
            sendPos={sendPos}/>
        )}
        <TheirTeamVid
          streamManager={mainStreamManager}
          subscribers={subscribers}
          publisher={publisher}
          team2Members={team2Members}
        />
      </Container>
    </Page>
  );
};
export default GameFlow;

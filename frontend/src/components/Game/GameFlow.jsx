import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";
import MyButton from "components/common/MyButton";
import GameStartAnimation from "components/utils/GameStartAnimation";
import GameOver from "components/utils/GameOver";
import GameEnding from "components/common/GameEnding";
import buttonClick from "resources/sounds/ssafyromeda_soundpack/06_button.wav";
import Loading from "components/common/Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  /* border: 1px solid black; */
  border-radius: 20px;
  margin-top: 5px;
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

const AnimationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  height: 85vh;
  color: white;
`;

const GameOverContainer = styled.div`
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
  isSuccess,
  setIsSuccess,
  players,
  startAnimationPlaying,
  setStartAnimationPlaying,
  turnNum,
  setTurnNum,
  isGameOver,
  setIsGameOver,
  winner,
  setWinner,
  loser,
  setLoser,
}) => {
  const playerNum = players.length; // 몇명이서 하는지
  const myTurnNum = players.indexOf(userNickname);
  console.log("myTurnNum은? " + myTurnNum);

  const [diceTurn, setDiceTurn] = useState(false);
  const [diceResult, setDiceResult] = useState(0);

  // 효과음
  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  const buttonSoundEffect = () => {
    playSound(buttonClick);
  };

  // 게임 시작 버튼을 통해 이벤트 받을 때 ----help
  const gameFlowStart = (event) => {
    if (isHostPlayer) {
      setIsGameStarted(true);
      sendPlayers();
      console.log(players);

      setTimeout(() => {
        sendGameStartSignal(); // setStartAnimationPlaying(true); 쏘기
      }, 1000);
      posReset(); // 내 포지션도 리셋
      console.log("myTurnNum은?" + myTurnNum);
    }
    setStartAnimationPlaying(true); // 게임 시작 에니메이션 트리거 ON
  };

  useEffect(() => {
    if (players !== undefined) {
      console.error(`내가 찍은 ${players}`);
    }
  }, [players]);

  // 포지션 리셋
  const posReset = () => {
    setT1Pos(0);
    setT1Pos(0);
    setNextThrowUser(0);
  };

  // 게임 시작 로직
  useEffect(() => {
    if (startAnimationPlaying !== undefined && startAnimationPlaying) {
      console.log("게임 시작 애니메이션 실행!");
      console.log(players);
      /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(?)) (setStartAnimationPlaying(false); 처리)------------------ / ----help */
      setTimeout(() => {
        setStartAnimationPlaying(false);
      }, 2000);
    }
  }, [startAnimationPlaying]);

  // 게임 시작 애니메이션 로직
  // useEffect(() => {
  //   if (startAnimationPlaying !== undefined && !startAnimationPlaying) {
  //     console.log("게임 시작 애니메이션 종료!");
  //     checkDiceTurn();
  //   }
  // }, [startAnimationPlaying]);

  // // 자신의 주사위 턴인지 확인
  // const checkDiceTurn = () => {
  //   // 초기값 0
  //   if (myTurnNum === nextThrowUser) {
  //     setIsDiceThrow(true); // 다음에 주사위를 던짐
  //   }
  // };

  // // 주사위 권한이 변경되면 주사위 턴으로 진입
  // useEffect(() => {
  //   if (isDiceThrow !== undefined && isDiceThrow) {
  //     sendDiceTurnSignal(subscribers); // 다른 사람들 전부 주사위 턴 돌입하라고 명령
  //     setDiceTurn(true); // 나도 주사위 턴으로 돌입
  //   }
  // }, [isDiceThrow]);

  // // 주사위 턴 전환 로직
  // useEffect(() => {
  //   if (diceTurn !== undefined && diceTurn) {
  //     // 만약 주사위 턴이 시작이라면
  //     console.warn("주사위 턴 시작!");
  //     startDiceTurn();
  //   }
  // }, [diceTurn]);

  // // 주사위 턴 시작 트리거
  // const startDiceTurn = () => {
  //   if (isDiceThrow !== undefined && isDiceThrow) {
  //     console.log("당신이 던질 차례입니다.");
  //     setDiceResult(
  //       0
  //     ); /* ---주사위 수 로직 '0' 대신에 삽입(setTimeOut(?)) setDiceTurn(false);로 주사위 턴 종료 --- / ----help */
  //   } else if (isDiceThrow !== undefined && !isDiceThrow) {
  //     console.log("당신이 던질 차례가 아닙니다.");
  //     /* --------------대기 중... 애니메이션? 모달? 삽입------------------ / ----help */
  //   }
  // };

  // // 주사위가 던져저서 숫자가 변하면 발동
  // useEffect(() => {
  //   if (diceResult !== undefined && diceResult > 0) {
  //     console.log(`주사위 숫자 : ${diceResult}`);
  //     if (myTeam === 1) setT1Pos(t1Pos + diceResult); // 자신이 팀 1일 때
  //     else if (myTeam === 2) setT2Pos(t2Pos + diceResult); // 자신이 팀 2일 때
  //   }
  // }, [diceResult]);

  // useEffect(() => {
  //   if (t1Pos !== undefined && !(t1Pos === 0 && t2Pos === 0) && diceTurn) {
  //     // 내가 주사위를 던진 사람이라면 바뀐 포지션을 던진다.
  //     if (isDiceThrow) {
  //       sendPos(subscribers);
  //       setDiceResult(0);
  //     }
  //     // 위치가 바뀌면 다이스 턴을 종료한다.
  //     setDiceTurn(false);
  //   }
  //   if (gameTurn) {
  //   }
  // }, [t1Pos, t2Pos]);

  // // 주사위 턴이 종료되었을 때
  // useEffect(() => {
  //   if (diceTurn !== undefined && !diceTurn) {
  //     // 주사위 턴이 종료된다면
  //     endDiceTurn();
  //     console.warn("주사위 턴 종료!");
  //   }
  // }, [diceTurn]);

  // // 게임 턴이 시작한다.
  // const endDiceTurn = () => {
  //   setGameTurn(true);
  // };

  // // 게임 턴이 시작되고 내가 방장이라면
  // useEffect(() => {
  //   if (gameTurn !== undefined && gameTurn) {
  //     if (isHostPlayer) {
  //       setNextMiniGameNum(Math.floor(Math.random(1, 5) + 1));
  //     }
  //   }
  // }, [gameTurn]);

  // // 다음 미니게임이 정해졌을 때
  // useEffect(() => {
  //   if (nextMiniGameNum !== undefined && isHostPlayer && nextMiniGameNum > 0) {
  //     sendNextMiniGame(subscribers);
  //   }
  //   setMiniGameSelectTurn(true);
  // }, [nextMiniGameNum]);

  // // 미니 게임 턴이 되었을 때
  // useEffect(() => {
  //   if (miniGameSelectTurn !== undefined && miniGameSelectTurn) {
  //     switch (nextMiniGameNum) {
  //       case 1:
  //         setMiniGame1(true);
  //         break;
  //       case 2:
  //         setMiniGame2(true);
  //         break;
  //       case 3:
  //         setMiniGame3(true);
  //         break;
  //       case 4:
  //         setMiniGame4(true);
  //         break;
  //       case 5:
  //         setMiniGame5(true);
  //         break;
  //     }
  //     setMiniGameSelectTurn(false);
  //   }
  // }, [miniGameSelectTurn]);

  // // 미니게임 성공 시
  // useEffect(() => {
  //   if (isSuccess !== undefined && isSuccess !== null) {
  //     if (isSuccess === true) {
  //       // 성공하면 아무것도 하지 않는다.
  //     }
  //     setIsSuccess(null); // 위치를 모두 보내면 성공 여부를 초기화시킨다.
  //   }
  // }, [isSuccess]);

  // // 미니게임 실패 시
  // useEffect(() => {
  //   if (isSuccess !== undefined && isSuccess !== null) {
  //     if (isSuccess === false) {
  //       // 자신이 팀 1일 때
  //       if (myTeam === 1) {
  //         if (t1Pos - 5 < 0)
  //           setT1Pos(0); // 위치가 0보다 작게 나오면 0으로 위치를 변경한다.
  //         else setT1Pos(t1Pos - 5); // 5칸 뒤로 후진
  //       } // 자신이 팀 2일 때
  //       else if (myTeam === 2) {
  //         if (t2Pos - 5 < 0)
  //           setT2Pos(0); // 위치가 0보다 작게 나오면 0으로 위치를 변경한다.
  //         else setT2Pos(t2Pos - 5); // 5칸 뒤로 후진
  //       }
  //     }
  //     setIsSuccess(null); // 위치를 모두 보내면 성공 여부를 초기화시킨다.
  //     setGameTurn(false); // 게임 턴을 종료시킨다.
  //   }
  // }, [isSuccess]);

  // // 게임 턴이 종료된다면
  // useEffect(() => {
  //   if (gameTurn !== undefined && !gameTurn) {
  //     // 게임이 끝나지 않았다면
  //     if (!checkEndGame()) {
  //       checkDiceTurn();
  //     }
  //   }
  // }, [gameTurn]);

  // const checkEndGame = () => {
  //   if (t1Pos >= 25) {
  //     // 팀 1 우승!!! 컴포넌트
  //     return true;
  //   } else if (t2Pos >= 25) {
  //     // 팀 2 우승!!! 컴포넌트
  //     return true;
  //   }
  //   return false;
  // };



  // 현재 참여 플레이어 뿌리기
  const sendPlayers = () => {
    const sendData = {
      session: mySessionId,
      to: [], // all user
      data: JSON.stringify({
        players,
      }),
      type: "UPDATE_PLAYERS",
    };

    fetch("https://i8d205.p.ssafy.io/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
  };

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
        startAnimationPlaying: true,
        turnNum: 0,
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
        // nextThrowUser: (nextThrowUser + 1) % 3,
        turnNum: turnNum,
        // diceTurn: false,
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

  // 게임 종료
  useEffect (() => {
    if (isGameOver === true) {
      const sendData = {
        session: mySessionId,
        to: [], // all user
        data: JSON.stringify({
          nextT1Pos: t1Pos,
          nextT2Pos: t2Pos,
          isGameOver: true,
          winner: winner,
          loser: loser,
        }),
        type: "GAME_OVER",
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
    }
  }, [isGameOver]);

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
        {isGameOver ? (
          <GameOverContainer>
            <GameOver 
              myTeam={myTeam}
              loser={loser}
              winner={winner}
              />
          </GameOverContainer>
        ) : isGameStarted !== true ? (
          <>
            {isHostPlayer === true ? (
              <GameStartButton>
                <MyButton
                  lang={"Korean"}
                  text={"게임 시작"}
                  type={"is-success"}
                  onClick={() => {
                    buttonSoundEffect();
                    GameStart();
                  }}
                />
              </GameStartButton>
            ) : (
              <GameStartButton>
                <Loading />
              </GameStartButton>
            )}
          </>
        ) : (
          <>
            {startAnimationPlaying === true ? (
              <AnimationContainer>
                <GameStartAnimation />
              </AnimationContainer>
            ) : (
              <Map
                setT1Pos={setT1Pos}
                setT2Pos={setT2Pos}
                t1Pos={t1Pos}
                t2Pos={t2Pos}
                sendPos={sendPos}
                nextThrowUser={nextThrowUser}
                setNextThrowUser={setNextThrowUser}
                myTurnNum={myTurnNum}
                // playerNum={playerNum}
                // myTurnNum={myTurnNum}
                turnNum={turnNum}
                setTurnNum={setTurnNum}
                setIsGameOver={setIsGameOver}
                players={players}
                // sendGameOver={sendGameOver}
                setWinner={setWinner}
                setLoser={setLoser}
                mySessionId={mySessionId}
              />
            )}
          </>
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

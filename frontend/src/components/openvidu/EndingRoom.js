import React, { useEffect } from "react";
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";
import MainUserVideoComponent from "./MainUserVideoComponent"; // 미니게임 중앙화면용
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "../../../node_modules/react-router-dom/index";

const EndingRoomBlock = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainVideo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 2rem;
  position: absolute;
  top: 10vh;
  left: 24vw;
  width: 40vw;
  height: 40vh;
  & video {
    cursor: initial;
  }
`;

const EndingBtn = styled.div`
  cursor: pointer;
  position: absolute;
  left: ${(props) => props.leftPos};
  top: 80vh;
  padding-right: 0.5vw;
  padding-top: 0.2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${MvpStone});
  background-size: 15vw 10vh;
  width: 15vw;
  height: 10vh;
  color: white;
  font-size: 5vmin;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`;

const EndingUsersContainer = styled.div`
  width: 25vw;
  height: 25vh;
  cursor: pointer;
  position: absolute;
  &.pos0 {
    top: 10vh;
    left: 0vw;
  }
  &.pos1 {
    top: 40vh;
    left: 0vw;
  }
  &.pos2 {
    top: 70vh;
    left: 0vw;
  }
  &.pos3 {
    top: 10vh;
    right: 0vw;
  }
  &.pos4 {
    top: 40vh;
    right: 0vw;
  }
  &.pos5 {
    top: 70vh;
    right: 0vw;
  }
`;

const GameOverLoading = styled.div`
  position: absolute;
  display: flex;
  top: 17vh;
  left: 25vw;
  width: 54vw;
  height: 60vh;
  background: url(${gameSetAnimation});
  background-size: 54vw 60vh;
  border-radius: 5px;
  padding-bottom: 5vh;
`;

const EndingRoom = ({
  isGameOver,
  sessionHost,
  pictureVote,
  isMvpSpeechDone,
  setIsGameDone,
  isGameDone,
  nextPlayer,
  setNextPlayer,
  isRoll,
  setIsRoll,
  isVote,
  setIsVote,
  vote,
  setVote,
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mySessionIdValue,
  myUserNameValue,
  mainStreamManager,
  publisher,
  players,
  subscribers,
  session,
  turnNum,
  setTurnNum,
  posList,
  setPosList,
  minigameType,
  setMinigameType,
}) => {
  const navigate = useNavigate();
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  const playerNum = 6; // 몇 명에서 하는지
  const teamNum = 2;
  const myTurnNum = players.indexOf(myUserNameValue);
  const [timeLeft, setTimeLeft] = useState(10);

  const calculateTimeLeft = () => {
    console.log(timeLeft);
    if (timeLeft > 0) {
      if (!isGameOver) {
        return 10;
      }
      return timeLeft - 1;
    } else {
      // timeLeft = 0
      // 세션 나가고
      leaveSession();
      //로비 화면으로 이동
      navigate("/lobby");
    }
  };

  useEffect(() => {
    if (nextPlayer === myUserNameValue) {
      handleMainVideoStream(publisher);
    } else {
      const temp = subscribers.filter(
        (sub) =>
          JSON.parse(sub.stream.connection.data).clientData === nextPlayer
      )[0];
      handleMainVideoStream(temp);
    }
  }, [nextPlayer]);

  // 카운트 다운 작성
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [timeLeft]);

  // 게임 종료 5초 로딩phase 시작
  useEffect(() => {
    if (isGameOver) {
      setTimeLeft(5); // 종료 로딩 타임
    } else {
      return;
    }
  }, [isGameOver]);

  const onClickGameOver = () => {
    // 게임 종료 알림
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        nextIsGameOver: true, // 다음 vote 상황
      }),
      type: "GAME_OVER",
    };

    fetch("https://i7e101.p.ssafy.io:4443/openvidu/api/signal", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
  };

  return (
    <EndingRoomBlock>
      {mainStreamManager !== undefined ? (
        isGameOver ? (
          <GameOverLoading></GameOverLoading>
        ) : (
          <MainVideo>
            {/* <p>메인스트리머</p> */}
            <MainUserVideoComponent
              isGameDone={isGameDone}
              isRoll={isRoll}
              streamManager={mainStreamManager}
              mainStreamer={"mvpStreamer"}
              myTurnNum={myTurnNum}
              playerNum={playerNum}
              players={players}
              mySessionIdValue={mySessionIdValue}
              turnNum={turnNum}
              nextPlayer={nextPlayer}
              isVote={isVote}
              setIsVote={setIsVote}
              vote={vote}
              setVote={setVote}
              posList={posList}
              minigameType={minigameType}
              isMvpPhase={true}
            />
          </MainVideo>
        )
      ) : null}
      {publisher !== undefined ? (
        <EndingUsersContainer className={`pos${0}`}>
          {/* onClick={() => handleMainVideoStream(publisher)} */}
          <UserVideoComponent
            streamManager={publisher}
            mainStreamer={"publisher"}
            status={"ending"}
          />
        </EndingUsersContainer>
      ) : null}
      {subscribers.map((sub, i) => (
        <EndingUsersContainer className={`pos${i + 1}`} key={`ending${i}`}>
          {/* onClick={() => handleMainVideoStream(sub) */}
          <UserVideoComponent
            streamManager={sub}
            mainStreamer={"sub"}
            status={"ending"}
          />
        </EndingUsersContainer>
      ))}
      {(myUserNameValue === sessionHost) & !isGameOver ? (
        <EndingBtn leftPos={"45vw"} onClick={() => onClickGameOver()}>
          게임 종료
        </EndingBtn>
      ) : (
        ""
      )}
    </EndingRoomBlock>
  );
};

export default EndingRoom;

import React, { useEffect } from "react";
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";
// import ReactAudioPlayer from "../utils/reactAudioPlayer";
import { useState } from "react";


const WaitingUserVideoContainer = styled.div`
  width: 25vw;
  height: 25vh;
  cursor: pointer;
  position: absolute;
  &.pos0 {
    top: 10vh;
    left: 2vw;
  }
  &.pos1 {
    top: 40vh;
    left: 2vw;
  }
  &.pos2 {
    top: 70vh;
    left: 2vw;
  }
  &.pos3 {
    top: 10vh;
    right: 2vw;
  }
  &.pos4 {
    top: 40vh;
    right: 2vw;
  }
  &.pos5 {
    top: 70vh;
    right: 2vw;
  }
`;

const WaitingRoom = ({
  sessionHost,
  sessionCapacity,
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
  // const [posNum, setPosNum] = useState(1);
  // 게임 진행 관련 변수들
  // console.warn("퍼블리셔는?",publisher);
  //const playerNum = players.length; // 몇 명에서 하는지
  const playerNum = 6; // 몇 명에서 하는지
  const teamNum = 2; // 몇 팀에서 하는지
  //const myTurnNum = players.indexOf(myUserNameValue);
  //const [manualNum, setManualNum] = useState(1);

  // useInterval(() => {
  //   setManualNum((manualNum+1)%3 + 1);
  // }, 10000);

  // 게임 시작
  const onClickStartGame = () => {
    // 데이터 정리
    //const nextTurnNum = Math.floor(Math.random() * playerNum);
    const nextTurnNum = 1;
    const nextNextPlayer = players[nextTurnNum];
    const nextPosList = new Array(teamNum).fill(0);
    const nextIsRoll = false;

    // emit
    const sendData = {
      session: mySessionIdValue,
      to: [], // all user
      data: JSON.stringify({
        nextTurnNum: nextTurnNum,
        nextNextPlayer: nextNextPlayer,
        nextPosList: nextPosList,
        nextIsRoll: nextIsRoll,
        nextIsGameStart: true,
      }),
      type: "GAME_STATE_START",
    };
    // console.log(JSON.stringify(sendData));
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
    <>
    </>
    // <WaitingRoomBlock>
    //   <ReactAudioPlayer
    //     urlSound={waitingRoomSound}
    //     isLoop={true}
    //     isPlaying={true}
    //     volumeNum={0.1}
    //   ></ReactAudioPlayer>
    //   <OpenViduSessionHeader>{mySessionIdValue}번 방</OpenViduSessionHeader>
    //   {/* <ManualBox className={`manual-${manualNum}`}></ManualBox> */}
    //   {sessionHost === myUserNameValue ? (
    //     playerNum === Number(sessionCapacity) ? (
    //       <GameStartBtn onClick={() => onClickStartGame()}>
    //         게임시작
    //       </GameStartBtn>
    //     ) : (
    //       <GameStartBtn className="waitingBtn">
    //         대기중 ({playerNum == 0 ? 1 : playerNum}/{sessionCapacity}명)
    //       </GameStartBtn>
    //     )
    //   ) : (
    //     ""
    //   )}

    //   {publisher !== undefined ? (
    //     <WaitingUserVideoContainer className={`pos${0}`}>
    //       {/* onClick={() => handleMainVideoStream(publisher)} */}
    //       <UserVideoComponent
    //         streamManager={publisher}
    //         mainStreamer={"publisher"}
    //         status={"waiting"}
    //       />
    //     </WaitingUserVideoContainer>
    //   ) : null}
    //   {subscribers.map((sub, i) => (
    //     <WaitingUserVideoContainer
    //       className={`pos${i + 1}`}
    //       key={`waiting${i}`}
    //     >
    //       {/* onClick={() => handleMainVideoStream(sub) */}
    //       <UserVideoComponent
    //         streamManager={sub}
    //         mainStreamer={"sub"}
    //         status={"waiting"}
    //       />
    //     </WaitingUserVideoContainer>
    //   ))}
    // </WaitingRoomBlock>
  );
};

export default WaitingRoom;

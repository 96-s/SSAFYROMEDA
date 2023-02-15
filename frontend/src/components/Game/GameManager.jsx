// import GamePage from "pages/GamePage";
import GameFlow from "./GameFlow";
import DesignTestPage from "pages/DesignTestPage";
import MyButton from "components/common/MyButton";
import BgmButton from "../common/BgmButton";
import BackButton from "resources/images/logout_icon.png";

import { OpenVidu } from "openvidu-browser";
import React, { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import axios from "axios";
import styled from "styled-components";

import buttonClick from "resources/sounds/ssafyromeda_soundpack/06_button.wav";
import gameRoomBgm from "resources/sounds/ssafyromeda_soundpack/04_gamebgm.wav";

const SessionHeaderDiv = styled.div`
  /* display: flex; */
  justify-content: space-between;
  color: white;
`;

const SessionIdDiv = styled.div`
  display: flex;
  justify-content: center;
  color: white;
`;

const BackButtonDiv = styled.img`
  width: 60px;
  height: 60px;
  /* margin-left:5px; */
  /* margin-top: 3px; */
  margin-right: 5px;
`;

const ButtonSecctionnDiv = styled.div`
  display: flex;
  margin-left: 60%;
  float: right;
`;
const H1tag = styled.h1`
  /* margin-right: 10px; */
  .h1{
    margin-right: 10px;
  }
`;

const APPLICATION_SERVER_URL = "https://i8d205.p.ssafy.io/api/rooms/";
const temp = localStorage.getItem("persist:root");
let token = "";

if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  token = temp3.token;
}

const GameManager = () => {
  //강제 re-rendering 함수
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // 해솜 - state 불러오는게 에러나서 코드 수정했습니다
  const { userNickname, userNo } = useSelector((state) => state?.auth?.user);

  //비디오 관련 변수
  const [ov, setOv] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("");
  const [streamManager, setStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // 게임 관련 변수
  const [t1Pos, setT1Pos] = useState(0);
  const [t2Pos, setT2Pos] = useState(0);
  const [players, setPlayers] = useState([]);
  // 방장인지 아닌지
  const [isHostPlayer, setIsHostPlayer] = useState(false);
  // 현재 순서
  const [turnNum, setTurnNum] = useState(0);
  // 게임 내 고유 번호
  const [myGameNo, setMyGameNo] = useState(0);
  // 주사위 던지는 유저
  const [nextThrowUser, setNextThrowUser] = useState(0);
  // 내가 주사위 던지는지 여부
  const [isDiceThrow, setIsDiceThrow] = useState(false);
  const [diceTurn, setDiceTurn] = useState(true);
  // 내 팀
  const [myTeam, setMyTeam] = useState(1);
  const [team1Members, setTeam1Members] = useState([]);
  const [team2Members, setTeam2Members] = useState([]);
  // 이번 턴에 게임 진행하는 여부
  const [gameTurn, setGameTurn] = useState(true);
  const [isDice, setIsDice] = useState(false);
  const [gameNo, setGameNo] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startAnimationPlaying, setStartAnimationPlaying] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [nextMiniGameNum, setNextMiniGameNum] = useState(undefined);
  const [miniGameSelectTurn, setMiniGameSelectTurn] = useState(undefined);
  const [winner, setWinner] = useState(null); // 팀 번호 들어감 1 or 2
  const [loser, setLoser] = useState(null);
  // 미니게임 여부
  const [miniGame1, setMiniGame1] = useState(false);
  const [miniGame2, setMiniGame2] = useState(false);
  const [miniGame3, setMiniGame3] = useState(false);
  const [miniGame4, setMiniGame4] = useState(false);
  const [miniGame5, setMiniGame5] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const componentDidMount = () => {
    window.addEventListener("beforeunload", onbeforeunload);
  };

  const componentWillUnmount = () => {
    window.removeEventListener("beforeunload", onbeforeunload);
    joinRoom();
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  };

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (streamManager !== stream) {
      setStreamManager(stream);
    }
  };

  // //openviduDeployment로 부터 token 가져오기 sessionid 받아서 token 생성
  const getTokenWithSid = async () => {
    const response = await axios.post(
      APPLICATION_SERVER_URL,
      {
        userNo: userNo,
        userNickname: userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const mySessionId = response.data;
    setMySessionId(mySessionId);

    const res = await axios.put(
      APPLICATION_SERVER_URL + mySessionId,
      {
        userNo: userNo,
        userNickname: userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  //openvidudployment로 부터 token 가져오기
  const getToken = async (sessionId) => {
    const response = await axios.put(
      APPLICATION_SERVER_URL + mySessionId,
      {
        userNo: userNo,
        userNickname: userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  // 방 생성
  const initRoom = async () => {
    const tempOv = new OpenVidu();
    setOv(tempOv);

    const tempSession = await tempOv.initSession();
    setSession(tempSession);

    var mySession = tempSession;

    mySession.on("streamCreated", (event) => {
      // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
      // 요소 삽입X
      var tempSubscriber = mySession.subscribe(event.stream, undefined);
      var tempSubscribers = subscribers;
      tempSubscribers.push(tempSubscriber);

      // Update the state with the new subscribers
      setSubscribers(tempSubscribers);
      forceUpdate(); // 스트림 생성될때마다 강제 랜더링

      if (team1Members.length < 3) {
        team1Members.push(tempSubscriber);
        setMyTeam(1);
      } else {
        team2Members.push(tempSubscriber);
        setMyTeam(2);
      }

      // setIsHostPlayer(true);
      // console.log(isHostPlayer);

      console.log("initRoom() streamCreated");
      console.log("내 팀은?" + myTeam);
    });

    // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // exception 처리
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // 게임 로직 경계선
    /* ------------------------------------------------------------------------------------------------------------------------ */

    mySession.on("GAME_RESET", (data) => {
      // const { start } = JSON.parse(data.data);
      const {
        t1Pos,
        t2Pos,
        nextThrowUser,
        isGameStarted,
        startAnimationPlaying,
      } = JSON.parse(data.data);
      // console.log(`start? : ${start}`);

      // 각 게임 정보 초기화
      setT1Pos(t1Pos);
      setT2Pos(t2Pos);
      setNextThrowUser(nextThrowUser);
      setIsGameStarted(isGameStarted);
      setStartAnimationPlaying(startAnimationPlaying);
      console.log(isGameStarted);
    });

    mySession.on("DICE_TURN", (data) => {
      const { diceTurn } = JSON.parse(data.data);
      console.log(`diceTurn? : ${diceTurn}`);

      setDiceTurn(true);
    });

    mySession.on("POS_UPDATE", (data) => {
      const { nextT1Pos, nextT2Pos, nextThrowUser, diceTurn, turnNum } =
        JSON.parse(data.data);
      console.log(
        "팀1 다음 포지션 : " +
          nextT1Pos +
          ", 팀2 다음 포지션 : " +
          nextT2Pos +
          ", 다음에 던지는 사람 : " +
          nextThrowUser
      );

      // 각 팀 포지션 업데이트
      setT1Pos(nextT1Pos);
      setT2Pos(nextT2Pos);
      // 다음 주사위 유저 지정
      setNextThrowUser(nextThrowUser);
      // 주사위 턴 종료
      setDiceTurn(diceTurn);
      setTurnNum(turnNum);
    });

    mySession.on("NEXTGAME_UPDATE", (data) => {
      const { nextGame } = JSON.parse(data.data);
      console.log(`nextGame? : ${nextGame}`);

      // 미니 게임 세팅
      setNextMiniGameNum(nextGame);
    });

    mySession.on("GAME_OVER", (data) => {
      const { nextT1Pos, nextT2Pos, isGameOver, winner, loser } = JSON.parse(
        data.data
      );

      setT1Pos(nextT1Pos);
      setT2Pos(nextT2Pos);
      setIsGameOver(isGameOver);
      setWinner(winner);
      setLoser(loser);
    });

    /* ------------------------------------------------------------------------------------------------------------------------ */
    // 게임 로직 경계선

    getTokenWithSid().then((token) => {
      mySession
        .connect(token, { clientData: userNickname })
        .then(async () => {
          var devices = await tempOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // publisher(자기 자신) 초기화 및 카메라 세팅
          let tempPublisher = tempOv.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: "240x180.4",
            frameRate: 50,
            mirror: false,
          });

          mySession.publish(tempPublisher);

          setCurrentVideoDevice(videoDevices[0]);
          setStreamManager(tempPublisher);
          setPublisher(tempPublisher);

          if (team1Members.length < 3) {
            team1Members.push(tempPublisher);
            setMyTeam(1);
          } else {
            team2Members.push(tempPublisher);
            setMyTeam(2);
          }

          console.log("initRoom() getTokenWithSid()");
          console.log(myTeam);
          setIsHostPlayer(true);
          console.log("내 게임순서" + myGameNo);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  //방 입장
  const joinRoom = async () => {
    const tempOv = new OpenVidu();
    setOv(tempOv);

    const tempSession = await tempOv.initSession();
    setSession(tempSession);
    var mySession = tempSession;

    mySession.on("streamCreated", (event) => {
      // 구독자 추가
      var tempSubscriber = mySession.subscribe(event.stream, undefined);
      var tempSubscribers = subscribers;
      tempSubscribers.push(tempSubscriber);

      // 정은 - 들어올 때마다 플레이어에 넣는 작업
      let tempPlayers = tempSubscribers.map(
        (tempsub) => JSON.parse(tempsub.stream.connection.data).clientData
      );

      // 자기 자신 없으면 넣어야함
      if (tempPlayers.includes(userNickname) === false) {
        tempPlayers.push(userNickname);
      }

      setPlayers(tempPlayers.sort());
      console.log("players" + players);

      setSubscribers(tempSubscribers);
      forceUpdate(); // 스트림 생성될때마다 강제 랜더링

      if (team1Members.length < 3) {
        team1Members.push(tempSubscriber);
        setMyTeam(1);
      } else {
        team2Members.push(tempSubscriber);
        setMyTeam(2);
      }

      console.log("joinRoom() streamCreated");
      console.log(myTeam);
    });

    // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업데이트
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // 게임 로직 경계선
    /* ------------------------------------------------------------------------------------------------------------------------ */

    mySession.on("GAME_RESET", (data) => {
      const { start } = JSON.parse(data.data);
      console.log(`start? : ${start}`);

      // 각 게임 정보 초기화
      setT1Pos(0);
      setT2Pos(0);
      setNextThrowUser(0);
      setIsGameStarted(true);
      setStartAnimationPlaying(true);
    });

    mySession.on("DICE_TURN", (data) => {
      const { diceTurn } = JSON.parse(data.data);
      console.log(`diceTurn? : ${diceTurn}`);

      setDiceTurn(true);
    });

    mySession.on("POS_UPDATE", (data) => {
      const { nextT1Pos, nextT2Pos, nextThrowUser, diceTurn, turnNum } =
        JSON.parse(data.data);
      console.log(
        "팀1 다음 포지션 : " +
          nextT1Pos +
          ", 팀2 다음 포지션 : " +
          nextT2Pos +
          ", 다음에 던지는 사람 : " +
          nextThrowUser
      );

      // 각 팀 포지션 업데이트
      setT1Pos(nextT1Pos);
      setT2Pos(nextT2Pos);
      // 다음 주사위 유저 지정
      setNextThrowUser(nextThrowUser);
      // 주사위 턴 종료
      setDiceTurn(diceTurn);
      setTurnNum(turnNum);
    });

    mySession.on("NEXTGAME_UPDATE", (data) => {
      const { nextGame } = JSON.parse(data.data);
      console.log(`nextGame? : ${nextGame}`);

      // 미니 게임 세팅
      setNextMiniGameNum(nextGame);
    });

    mySession.on("GAME_OVER", (data) => {
      const { nextT1Pos, nextT2Pos, isGameOver, winner, loser } = JSON.parse(
        data.data
      );

      setT1Pos(nextT1Pos);
      setT2Pos(nextT2Pos);
      setIsGameOver(isGameOver);
      setWinner(winner);
      setLoser(loser);
    });

    /* ------------------------------------------------------------------------------------------------------------------------ */
    // 게임 로직 경계선

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: userNickname })
        .then(async () => {
          var devices = await tempOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          let tempPublisher = await tempOv.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: "240x180.4",
            frameRate: 50,
            mirror: false,
          });

          mySession.publish(tempPublisher);
          setCurrentVideoDevice(videoDevices[0]);
          setStreamManager(tempPublisher);
          setPublisher(tempPublisher);

          if (team1Members.length < 3) {
            team1Members.push(tempPublisher);
            setMyTeam(1);
          } else {
            team2Members.push(tempPublisher);
            setMyTeam(2);
          }

          console.log("joinRoom() getToken()");
          console.log(myTeam);
          console.log(userNickname);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const deleteSubscriber = (streamManager) => {
    let targetSubscribers = subscribers;
    let index = targetSubscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(
      targetSubscribers[index].stream.connection.data
    ).clientData;

    if (index > -1) {
      targetSubscribers.splice(index, 1);
      setSubscribers(targetSubscribers);
    }

    let tempPlayers = targetSubscribers.map(
      (tempsub) => JSON.parse(tempsub.stream.connection.data).clientData
    );
    console.log("나간 후 리스트", tempPlayers);
    if (tempPlayers.includes(userNickname) === false) {
      tempPlayers.push(userNickname);
    }
    setPlayers(tempPlayers.sort());
  };

  //현재 방에서 나가기
  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    console.log("Destroyed");
    console.log(team1Members);
    console.log(team2Members);

    // 관련 변수 초기화
    setOv(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    // setMyUserName("");
    setStreamManager(undefined);
    setPublisher(undefined);
  };

  // 브금
  const soundEffect = () => {
    playSound(buttonClick);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  return (
    <div className="container">
      {session === undefined ? (
        <DesignTestPage
          initRoom={initRoom}
          joinRoom={joinRoom}
          sessionId={mySessionId}
          handleChangeSessionId={handleChangeSessionId}
        />
      ) : null}

      {session !== undefined ? (
        <div>
          <SessionHeaderDiv>
            <div>
              <SessionIdDiv>
                <H1tag>우주선 번호 : {mySessionId}</H1tag>
                <CopyToClipboard text={mySessionId}>
                  <MyButton
                    lang={"Korean"}
                    text={"복사하기"}
                    onClick={soundEffect}
                    type={"is-primary"}
                  />
                </CopyToClipboard>
                <ButtonSecctionnDiv>
                  <BackButtonDiv
                    src={BackButton}
                    onClick={() => {
                      leaveSession();
                      soundEffect();
                    }}
                  />
                  <BgmButton bgm={gameRoomBgm} volume={0.2} />
                </ButtonSecctionnDiv>
              </SessionIdDiv>
            </div>
          </SessionHeaderDiv>
          <GameFlow
            ov={ov}
            session={session}
            mySessionId={mySessionId}
            streamManager={streamManager}
            publisher={publisher}
            subscribers={subscribers}
            isMike={isMike}
            isCamera={isCamera}
            isSpeaker={isSpeaker}
            // myUserName={myUserName}
            currentVideoDevice={currentVideoDevice}
            initRoom={initRoom}
            joinRoom={joinRoom}
            leaveSession={leaveSession}
            userNickname={userNickname}
            userNo={userNo}
            isHostPlayer={isHostPlayer}
            setT1Pos={setT1Pos}
            t1Pos={t1Pos}
            t2Pos={t2Pos}
            setT2Pos={setT2Pos}
            isDiceThrow={isDiceThrow}
            setIsDiceThrow={setIsDiceThrow}
            setGameTurn={setGameTurn}
            gameTurn={gameTurn}
            myTeam={myTeam}
            team1Members={team1Members}
            team2Members={team2Members}
            isGameStarted={isGameStarted}
            startAnimationPlaying={startAnimationPlaying}
            setStartAnimationPlaying={setStartAnimationPlaying}
            setIsGameStarted={setIsGameStarted}
            nextMiniGameNum={nextMiniGameNum}
            setNextMiniGameNum={setNextMiniGameNum}
            miniGameSelectTurn={miniGameSelectTurn}
            setMiniGameSelectTurn={setMiniGameSelectTurn}
            nextThrowUser={nextThrowUser}
            setNextThrowUser={setNextThrowUser}
            miniGame1={miniGame1}
            miniGame2={miniGame2}
            miniGame3={miniGame3}
            miniGame4={miniGame4}
            miniGame5={miniGame5}
            setMiniGame1={setMiniGame1}
            setMiniGame2={setMiniGame2}
            setMiniGame3={setMiniGame3}
            setMiniGame4={setMiniGame4}
            setMiniGame5={setMiniGame5}
            isSuccess={isSuccess}
            setIsSuccess={setIsSuccess}
            players={players}
            turnNum={turnNum}
            setTurnNum={setTurnNum}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            winner={winner}
            setWinner={setWinner}
            loser={loser}
            setLoser={setLoser}
          />
        </div>
      ) : null}
    </div>
  );
};
export default GameManager;

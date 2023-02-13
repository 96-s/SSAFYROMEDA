import GamePage from "pages/GamePage";
import LobbyPage from "pages/LobbyPage";
import DesignTestPage from "pages/DesignTestPage";
import MyButton from "components/common/MyButton";

import { OpenVidu } from "openvidu-browser";
import React, { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import axios from "axios";
import styled from "styled-components";

import buttonClick from "resources/sounds/ssafyromeda_soundpack/06_button.wav";
import lobbyBGM from "resources/sounds/ssafyromeda_soundpack/00_mainbgm.wav";

const SessionHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`;

const SessionidDiv = styled.div`
  display: flex;
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
  // 게임 내 고유 번호
  const [myGameNo, setMyGameNo] = useState(0);
  // 주사위 던지는 유저
  const [nextThrowUser, setNextThrowUser] = useState(0);
  // 내가 주사위 던지는지 여부
  const [isDiceThrow, setIsDiceThrow] = useState(false);
  // 내 팀
  const [myTeam, setMyTeam] = useState(1);
  const [team1Members, setTeam1Members]=useState([]);
  const [team2Members, setTeam2Members]=useState([]);
  // 이번 턴에 게임 진행하는 여부
  const [gameTurn, setGameTurn] = useState(true);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
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
      const { reset } = JSON.parse(data.data);
      console.log(`reset? : ${reset}`);

      // 각 게임 정보 초기화
      setT1Pos(0);
      setT2Pos(0);
      setNextThrowUser(0);
    });

    mySession.on("TURN_UPDATE", (data) => {
      const { nextT1Pos, nextT2Pos, beforeGameNo } = JSON.parse(data.data);
      console.log(
        "팀1 다음 포지션 : " +
          nextT1Pos +
          ", 팀2 다음 포지션 : " +
          nextT2Pos +
          ", 이전에 던진 유저 고유넘버 : " +
          beforeGameNo
      );

      // 각 팀 포지션 업데이트
      setT1Pos(nextT1Pos);
      setT2Pos(nextT2Pos);

      // 주사위 던짐 여부 테스트
      if ((beforeGameNo + 1) % 6 == myGameNo) {
        setIsDiceThrow(true);
        console.log("당신은 다음 턴에 주사위를 던집니다.");
      } else {
        setIsDiceThrow(false);
        console.log("당신은 다음 턴에 주사위를 던지지 않습니다.");
      }
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
          
          if(team1Members.length < 3){
            team1Members.push(tempPublisher);
          }
          else{
            team2Members.push(tempPublisher);
          }
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

      setSubscribers(tempSubscribers);
      forceUpdate(); // 스트림 생성될때마다 강제 랜더링

      if(team1Members.length < 3){
        team1Members.push(tempSubscriber);
      }
      else{
        team2Members.push(tempSubscriber);
      }
    });

    // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업데이트
    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

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
            insertMode: "APPEND",
            mirror: false,
          });

          mySession.publish(tempPublisher);
          setCurrentVideoDevice(videoDevices[0]);
          setStreamManager(tempPublisher);
          setPublisher(tempPublisher);

          if(team1Members.length < 3){
            team1Members.push(tempPublisher);
          }
          else{
            team2Members.push(tempPublisher);
          }
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
  };

  //현재 방에서 나가기
  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

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

  const lobbySoundEffect = () => {
    playSound(lobbyBGM);
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
              <SessionidDiv>
                
                <h1 id="session-title">Room Code : {mySessionId}</h1>
                <span>ㅤ</span>
              
                <CopyToClipboard text={mySessionId}>
                  <MyButton
                    lang={"Korean"}
                    text={"복사하기"}
                    onClick={soundEffect}
                    type={"is-primary"}
                  />
                </CopyToClipboard>
              </SessionidDiv>
            </div>
            <MyButton
              lang={"Korean"}
              text={"나가기"}
              onClick={() => {
                leaveSession();
                soundEffect();
                lobbySoundEffect();
              }}
              type={"is-warning"}
            />
          </SessionHeaderDiv>
          <GamePage
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
          />
        </div>
      ) : null}
    </div>
  );
};
export default GameManager;
import { OpenVidu } from "openvidu-browser";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import axios from "axios";
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";

const SessionIdDiv = styled.div`
  color: white;
`;

const APPLICATION_SERVER_URL = "https://i8d205.p.ssafy.io/api/rooms/"; //process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const temp = localStorage.getItem("persist:root");
let accessToken = "";

if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  accessToken = temp3.token;
}

const GameRoom = () => {
  // 유저 닉네임, 넘버 auth 정보에서 가져오기
  const { userNickname, userNo } = useSelector((state) => state.auth.user);

  const [ov, setOv] = useState(null); // 오픈비두 인스턴스
  const [session, setSession] = useState(undefined); // 생성된 세션
  const [mySessionId, setMySessionId] = useState(""); // 생성된 룸 코드
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined); // 동영상 송출하고 있는 사람 (디폴트는 본인)
  const [subscribers, setSubscribers] = useState([]); // 내 동영상 보고 있는 사람들
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [myUserName, setMyUserName] = useState(null); // 내 유저 닉네임
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // 게임 관련 변수
  const [t1Pos, setT1Pos] = useState(0);
  const [t2Pos, setT2Pos] = useState(0);
  // 게임 내 고유 번호
  const [myGameNo, setMyGameNo] = useState(0);
  // 주사위 던지는 유저
  const [throwUser, setThrowUser] = useState(0);
  // 내가 주사위 던지는지 여부
  const [isDice, setIsDice] = useState(true);
  // 내 팀
  const [myTeam, setMyTeam] = useState(1);
  // 이번 턴에 게임 진행하는 여부
  const [gameTurn, setGameTurn] = useState(true);

  useEffect(() => {
    // 유저가 방에 처음 들어왔을 때 상태를 다시 세팅한다.
    window.addEventListener("beforeunload", onbeforeunload);
    window.removeEventListener("beforeunload", onbeforeunload); // 안전 장치 (추후 제거 예정)
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    // 세션을 떠났을 때도 사용하지만 막 들어왔을 때도 청소용으로 사용한다.
    leaveSession();
  };

  const handleToggle = (kind) => {
    if (publisher) {
      switch (kind) {
        case "camera":
          setIsCamera(!isCamera);
          console.log(publisher);
          publisher.publishVideo(isCamera);
          break;

        case "speaker":
          setIsSpeaker(isSpeaker);
          subscribers.forEach((s) => s.subscribeToAudio(isSpeaker));
          break;

        case "mike":
          setIsMike(!isMike);
          publisher.publishAudio(isMike);
          break;
      }
    }
  };

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    console.log("세션 초기로 돌리는 중....");
    setOv(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(null);
    setMyUserName(userNickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let mySubscribers = subscribers;
    let index = mySubscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(
      mySubscribers[index].stream.connection.data
    ).clientData;
    console.log("제거할 이름", removeName);

    if (index > -1) {
      mySubscribers.splice(index, 1);

      setSubscribers(mySubscribers);

      console.error("나간 후 리스트", mySubscribers);
    }
  };

  useEffect(() => {
    if (ov !== null) {
      ov.setAdvancedConfiguration({
        publisherSpeakingEventsOptions: {
          interval: 50,
          threshold: -75,
        },
      });
      setSession(ov.initSession());
    }
  }, [ov]);

  useEffect(() => {
    console.log(session);
    if (session !== undefined) {
      let mySession = session;

      // --- 3) Specify the actions when events take place in the session ---

      // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
      mySession.on("streamCreated", (event) => {
        // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
        // 요소 삽입X
        let subscriber = mySession.subscribe(event.stream, undefined);
        // console.log(`전 ` + subscribers);
        var mySubscribers = subscribers;
        mySubscribers.push(subscriber);

        // Update the state with the new subscribers
        setSubscribers(mySubscribers);
        console.log(`후 ` + subscribers);
      });

      // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
      mySession.on("streamDestroyed", (event) => {
        // Remove the stream from 'subscribers' array
        deleteSubscriber(event.stream.streamManager);
      });

      // On every asynchronous exception...
      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      // --- 4) Connect to the session with a valid user token ---

      // Get a token from the OpenVidu deployment
      getToken(mySessionId).then((token) => {
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token, { clientData: myUserName })
          .then(async () => {
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = await ov.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "251.2x188.4", // 해상도
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: true, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Obtain the current video device in use
            var devices = await ov.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            var currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher
            setCurrentVideoDevice(currentVideoDevice);
            setMainStreamManager(publisher);
            setPublisher(publisher);
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
    }
  }, [session]);

  useEffect(() => {
    if (mySessionId !== null) console.log("RoomCode : " + mySessionId);
  }, [mySessionId]);

  const joinRoom = () => {
    setOv(new OpenVidu());
  };

  const initRoomCode = () => {
    createSession().then((newRoomCode) => {
      setMySessionId(newRoomCode);
    });
  };

  const switchCamera = async () => {
    try {
      const devices = await ov.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = ov.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);

          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getToken = async () => {
    return await createToken(mySessionId);
  };

  const createSession = async () => {
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
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("방 코드가 만들어졌습니다.");
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.put(
      APPLICATION_SERVER_URL + sessionId,
      //더미 데이터
      {
        userNo: userNo,
        userNickname: userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("토큰 만듬");
    return response.data; // The token
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <SessionIdDiv>
              <h1> Join a video session </h1>
            </SessionIdDiv>
            {/* <form className="form-group" onSubmit={initRoomCode}>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="INIT"
                />  
              </p>
            </form> */}
            <button className="btn btn-lg btn-success" onClick={initRoomCode}>
              INIT
            </button>
            <p>
              <label> Code: </label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                value={mySessionId}
                onChange={handleChangeSessionId}
                required
              />
            </p>
            <p className="text-center">
              <button className="btn btn-lg btn-success" onClick={joinRoom}>
                JOIN
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div id="session">
          <div id="session-header">
            <SessionIdDiv>
              <h1 id="session-title">Room Code: {mySessionId}</h1>
            </SessionIdDiv>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}

          <div id="video-container">
            {/* {this.state.publisher !== undefined ? 
    <div
      className="stream-container"
      onClick={() =>
        this.handleMainVideoStream(this.state.publisher)
      }
    >
      <UserVideoComponent streamManager={this.state.publisher} />
    </div>
      : null} */}
            {/* 방 참가자들 */}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-cvuontainer"
                // onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default GameRoom;

import { OpenVidu } from "openvidu-browser";
import { useState } from "react";
import axios from "axios";
import OpenViduSession from "./OpenViduSession";
import WaitingRoom from "./WaitingRoom";

// const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const OPENVIDU_SERVER_URL =
  "https://" + "i8d205.p.ssafy.io/dashboard" + ":4443";
const OPENVIDU_SERVER_SECRET = "ssafyromeda";

const OpenViduMain = () => {
  // OV
  const [ov, setOv] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("sessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // currentVideoDevice
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  // 게임진행 변수
  const [team, setTeam] = useState([]);
  const [players, setPlayers] = useState([]);
  const [turnNum, setTurnNum] = useState(0);
  const [nextPlayer, setNextPlayer] = useState('');
  const [posList, setPosList] = useState([0, 0, 0, 0, 0, 0]);
  const [minigameType, setMinigameType] = useState(undefined)
  const [isRoll, setIsRoll] = useState(false);

  // 주사위 변수
  const [whatDiceNum, setWhatDiceNum] = useState(0);

  // 중간에 오는 사람을 설정 (하위요소로 Props 필요함)
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // 세션 나갈때 작동
  const deleteSubscriber = (streamManager) => {
    let targetSubscribers = subscribers;
    let index = targetSubscribers.indexOf(streamManager, 0); // targetSubscribers에서 0번째 index부터 'streamManager'가 존재하는 index를 찾는다.
    const removeName = JSON.parse(
      targetSubscribers[index].stream.connection.data
    ).clientData;
    console.error("제거할 이름", removeName);

    if (index > -1) {
      targetSubscribers.splice(index, 1); // targetSubscribers에서 index 위치부터 1개의 요소를 삭제한다.
      setSubscribers(targetSubscribers);
    }
  };

  // ----------------------------------------------------------------------------------------------
  // Session 입장
  const joinSession = async () => {
    // --- 1) Get an OpenVidu object ---
    const newOv = new OpenVidu();
    setOv(newOv);

    // --- 2) Init a session ---
    const newSession = await newOv.initSession();
    // 다음 렌더링때 session이 업데이트 됨
    setSession(newSession);

    var mySession = newSession;

    // --- 3) Specify the actions when events take place in the session ---
    // 세션 참여
    // On every new Stream received...
    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var newSubscriber = mySession.subscribe(event.stream, undefined); // 새로운 참여자
      var newSubscribers = subscribers; // 참여자 목록
    });

    // On every Stream destroyed... (누가 나갈 때 마다)
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // 게임 관련 로직 작성

    // --- 4) Connect to the session with a valid user token ---
    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          var devices = await newOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties

          let newPublisher = newOv.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(newPublisher);

          // Set the main video in the page to display our webcam and store our Publisher
          // 이름만 뽑아냄
          // const publisherName = JSON.parse(newPublisher.stream.connection.data).clientData;
          // console.log("퍼블리셔이름", publisherName)
          // tempPlayers.push(publisherName);
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
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

  // 방 나갈때 필요함 (하위요소로 Props 필요)
  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setOv(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  // 카메라 변경에 필요
  // 카메라 변경에 필요한 아이(하위요소로 PROPS 필요함)
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
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Token 관련 로직 (async await 생략?) - join Session
  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <div>
      <h3>OpenVidu 메인 코드가 작성될 곳입니다.</h3>
      <WaitingRoom
        session={session}
        handleMainVideoStream={handleMainVideoStream}
        switchCamera={switchCamera}
        leaveSession={leaveSession}
        mainStreamManager={mainStreamManager}
        publisher={publisher}
        subscribers={subscribers}
      ></WaitingRoom>
    </div>
  );
};

export default OpenViduMain;

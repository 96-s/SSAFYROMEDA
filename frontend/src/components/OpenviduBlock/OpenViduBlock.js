import OpenViduSession from "components/room/OpenviduSession";
import WaitingRoom from "components/room/WaitingRoom";
import ResultComponent from "components/room/ResultComponent";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useSelector } from "react-redux";
import axios from "axios";

const OpenViduContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  // align-items: center;
  height: 100%;
  width: 100%;
`;

const APPLICATION_SERVER_URL = "https://i8d205.p.ssafy.io/api/rooms/"; //process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const OPENVIDU_SERVER_SECRET = "ssafyromeda";

const temp = localStorage.getItem("persist:root");
let token = "";
if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  token = temp3.token;
}

const OpenViduBlock = ({}) => {
  const { userNickname, userNo } = useSelector((state) => state.auth.user);

  const [ov, setOv] = useState(null);
  const [mySessionId, setMySessionId] = useState(undefined);
  const [myUserName, setMyUserName] = useState("");
  const [session, setSession] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [isMike, setMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  //   const [handleChangeSessionId, setHandleChangeSessionId] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // 게임 관련 변수들
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // 게임 진행 관련 변수
  const [players, setPlayers] = useState([]); // 플레이어들
  const [turnNum, setTurnNum] = useState(0); // 몇 번째 사람 차례인지(이번 턴 인 사람)
  const [nextPlayer, setNextPlayer] = useState(""); // 다음 사람(handlemainStreamer에 사용)
  const [posList, setPosList] = useState([0, 0]); // 6명 max라 생각하고 각자의 포지션
  const [minigameType, setMinigameType] = useState(undefined);
  // const [minigameDone, setMinigameDone] = useState(false); // 미니게임이 끝났는지
  const [isRoll, setIsRoll] = useState(false); // 굴렸는지

  useEffect(() => {
    // 창 닫을때 session 떠나게 해줌
    window.addEventListener("beforeunload", onbeforeunload);
    console.log(
      "ov " + ov + "\n",
      "session " + session + "\n",
      "subscribers " + subscribers + "\n",
      "mySessionId " + mySessionId + "\n",
      "myUserName " + myUserName + "\n",
      "mainStreamManager " + mainStreamManager + "\n",
      "publisher " + publisher
    );
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let targetSubscribers = subscribers;
    let index = targetSubscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(
      targetSubscribers[index].stream.connection.data
    ).clientData;
    console.error("제거할 이름", removeName);

    if (index > -1) {
      targetSubscribers.splice(index, 1);
      setSubscribers(targetSubscribers);
    }
    let tempPlayers = targetSubscribers.map(
      (tempsub) => JSON.parse(tempsub.stream.connection.data).clientData
    );
    console.error("나간 후 리스트", tempPlayers);
    // 자기 자신 없으면 넣어야함
    if (tempPlayers.includes(myUserName) === false) {
      tempPlayers.push(myUserName);
    }
    setPlayers(tempPlayers.sort());
  };

  const initRoom = () => {
    const OV = new OpenVidu();

    OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    const mySession = OV.initSession();
    console.log("세션 생성 후");
    console.log(mySession);

    mySession.on("streamCreated", (event) => {
      // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
      // 요소 삽입X
      let subscriber = mySession.subscribe(event.stream, undefined);
      var subscribers = this.state.subscribers;
      subscribers.push(subscriber);

      // Update the state with the new subscribers
      setSubscribers(subscribers);
    });

    // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // 동기화 코드 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          console.log(mySessionId);
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "251.2x188.4", // 해상도
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // 거울모드
          });

          mySession.publish(publisher);
          console.log("퍼블리시 후");
          //   console.log(this.state);

          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

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
  };

  const joinRoom = () => {
    const OV = new OpenVidu();

    OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    const mySession = OV.initSession();
    console.log("세션 생성 후");
    console.log(mySession);
    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
      // 요소 삽입X
      let tempSubscriber = mySession.subscribe(event.stream, undefined); // 새로운 참여자
      var tempSubscribers = subscribers;
      subscribers.push(tempSubscribers);

      const addUserName = JSON.parse(
        tempSubscriber.stream.connection.data
      ).clientData;
      console.error("이름은", addUserName);
      tempSubscribers.push(tempSubscriber);

      let tempPlayers = tempSubscribers.map(
        (tempsub) => JSON.parse(tempsub.stream.connection.data).clientData
      );

      // 자기 자신 없으면 넣어야함
      if (tempPlayers.includes(myUserName) === false) {
        tempPlayers.push(myUserName);
      }

      // Update the state with the new subscribers
      setSubscribers(subscribers);
      setPlayers(tempPlayers.sort());
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

    createToken(mySessionId).then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          console.log(mySessionId);
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "251.2x188.4", // 해상도
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: true, // 거울모드
          });

          mySession.publish(publisher);
          console.log("퍼블리시 후");
          //   console.log(this.state);

          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

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
  };

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

  const getToken = () => {
    return createSession().then((sessionId) => {
      createToken(sessionId);
    });
  };

  const createSession = () => {
    return new Promise((resolve, reject) => {
      console.log(userNo, userNickname);
      // var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(
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
        )
        .then((response) => {
          console.log("CREATE_SESSION", response);
          setMySessionId(response.data);
          resolve(response.data);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                APPLICATION_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  APPLICATION_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  APPLICATION_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                APPLICATION_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          APPLICATION_SERVER_URL + sessionId,
          { userNo: userNo, userNickname: userNickname },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(sessionId);
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  const onbeforeunload = (e) => {
    leaveSession();
  };

  // const mySessionIdValue = mySessionId;
  // const myUserNameValue = myUserName;

  // console.log("mySessionId는" + mySessionId);

  return (
    <OpenViduContainer className={isGameStart ? "" : "waitingRoom"}>
      {mySessionId === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={initRoom}>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="INIT"
                />
              </p>
            </form>
            <form className="form-group" onSubmit={joinRoom}>
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
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1>보여라</h1>
        </div>
      )}
    </OpenViduContainer>
  );
};

export default OpenViduBlock;

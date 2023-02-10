import GamePage from "pages/GamePage";
import UserVideoComponent from "./UserVideoComponent";

import { OpenVidu } from "openvidu-browser";
import React, { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import styled from "styled-components";

const SessionIdDiv = styled.div`
  color: white;
`;

const APPLICATION_SERVER_URL = "https://i8d205.p.ssafy.io/api/rooms/"; //process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const temp = localStorage.getItem("persist:root");
let token = "";

if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  token = temp3.token;
}

const OpenviduUiTest = () => {
  //강제 re-rendering 함수
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const { userNickname, userNo } = useSelector((state) => state.auth.user);

  const [ov, setOv] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("");
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [myUserName, setMyUserName] = useState("");
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

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

  const handleToggle = (kind) => {
    if (publisher) {
      switch (kind) {
        case "camera":
          setIsCamera(!isCamera);
          console.log(publisher);
          publisher.publishVideo(isCamera);
          break;

        case "speaker":
          setIsSpeaker(!isSpeaker);
          subscribers.forEach((s) => s.subscribeToAudio(isSpeaker));
          break;

        case "mike":
          setIsMike(!isMike);
          publisher.publishVideo(isMike);
          break;
      }
    }
  };

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };

  // handleChangeUserName(e) {
  //   this.setState({
  //     myUserName: e.target.value,
  //   });
  // }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

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

  const initRoom = async () => {
    const tempOv = new OpenVidu();
    setOv(tempOv);

    const tempSession = await tempOv.initSession();
    setSession(tempSession);

    var mySession = tempSession;

    mySession.on("streamCreated", (event) => {
      // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
      // 요소 삽입X
      console.log("stream created!!");
      var tempSubscriber = mySession.subscribe(event.stream, undefined);
      var tempSubscribers = subscribers;

      tempSubscribers.push(tempSubscriber);

      // Update the state with the new subscribers
      setSubscribers(tempSubscribers);
      forceUpdate(); // 스트림 생성될때마다 강제 랜더링
      console.log(subscribers.length);
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

    getTokenWithSid().then((token) => {
      mySession
        .connect(token, { clientData: userNickname })
        .then(async () => {
          var devices = await tempOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let tempPublisher = tempOv.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "240x180.4", // 해상도
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // 거울모드
          });

          mySession.publish(tempPublisher);

          // Obtain the current video device in use
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(tempPublisher);
          setPublisher(tempPublisher);
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

  const joinRoom = async () => {
    const tempOv = new OpenVidu();
    setOv(tempOv);

    const tempSession = await tempOv.initSession();
    setSession(tempSession);

    var mySession = tempSession;

    mySession.on("streamCreated", (event) => {
      // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
      // 요소 삽입X
      var tempSubscriber = mySession.subscribe(event.stream, undefined); // 새로운 참여자
      var tempSubscribers = subscribers;
      // 리액트에서 배열을 다른 변수에 바로 대입하는것은 참조되기 때문에 state가 즉각 변하지 않음

      // const addUserName = JSON.parse(
      //   tempSubscriber.stream.connection.data,
      // ).clientData;
      // console.error('이름은', addUserName);

      tempSubscribers.push(tempSubscriber);

      // let tempPlayers = tempSubscribers.map(
      //   (tempsub) => JSON.parse(tempsub.stream.connection.data).clientData,
      // );

      // 자기 자신 없으면 넣어야함
      // if (tempPlayers.includes(myUserName) === false) {
      //   tempPlayers.push(myUserName);
      // }

      // console.error('한명더들어왔어요!', tempPlayers);
      // Update the state with the new subscribers
      setSubscribers(tempSubscribers);
      forceUpdate(); // 스트림 생성될때마다 강제 랜더링
      console.log("현재 (join)subscribers 길이" + subscribers.length);
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
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname

      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          var devices = await tempOv.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let tempPublisher = await tempOv.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "240x180.4", // 해상도
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---
          mySession.publish(tempPublisher);

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(videoDevices[0]);
          setMainStreamManager(tempPublisher);
          setPublisher(tempPublisher);
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
    console.log("제거할 이름", removeName);

    if (index > -1) {
      targetSubscribers.splice(index, 1);
      setSubscribers(targetSubscribers);
      console.error("나간 후 리스트", subscribers);
    }
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    console.log(ov);
    console.log(subscribers);
    // Empty all properties...
    setOv(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);
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
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <SessionIdDiv>
              <h1> Join a video session </h1>
            </SessionIdDiv>
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
      ) : null}

      {session !== undefined ? (
        <div>
          <SessionIdDiv>
            <h1 id="session-title">Room Code : {mySessionId}</h1>
          </SessionIdDiv>
          {mainStreamManager !== undefined ? (
            <div id="main-video">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <GamePage
            ov={ov}
            session={session}
            mySessionId={mySessionId}
            mainStreamManager={mainStreamManager}
            publisher={publisher}
            subscribers={subscribers}
            isMike={isMike}
            isCamera={isCamera}
            isSpeaker={isSpeaker}
            myUserName={myUserName}
            currentVideoDevice={currentVideoDevice}
            initRoom={initRoom}
            joinRoom={joinRoom}
            leaveSession={leaveSession}
          />
        </div>
      ) : null}
    </div>
    // <div className="container">
    //   {session === undefined ? (
    //     <div id="join">
    //       <div id="join-dialog" className="jumbotron vertical-center">
    //         <SessionIdDiv>
    //           <h1> Join a video session </h1>
    //         </SessionIdDiv>
    //         <form className="form-group" onSubmit={initRoom}>
    //           <p className="text-center">
    //             <input
    //               className="btn btn-lg btn-success"
    //               name="commit"
    //               type="submit"
    //               value="INIT"
    //             />
    //           </p>
    //         </form>
    //         <form className="form-group" onSubmit={joinRoom}>
    //           <p>
    //             <label> Code: </label>
    //             <input
    //               className="form-control"
    //               type="text"
    //               id="sessionId"
    //               value={mySessionId}
    //               onChange={handleChangeSessionId}
    //               required
    //             />
    //           </p>
    //           <p className="text-center">
    //             <input
    //               className="btn btn-lg btn-success"
    //               name="commit"
    //               type="submit"
    //               value="JOIN"
    //             />
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   ) : // <LobbyPage
    //   //   initRoom={initRoom}
    //   //   joinRoom={joinRoom}
    //   //   sessionId={mySessionId}
    //   // />
    //   null}

    //   {session !== undefined ? (
    //     <div id="session">
    //       <div id="session-header">
    //         <SessionIdDiv>
    //           <h1 id="session-title">Room Code: {mySessionId}</h1>
    //         </SessionIdDiv>
    //         <input
    //           className="btn btn-large btn-danger"
    //           type="button"
    //           id="buttonLeaveSession"
    //           onClick={leaveSession}
    //           value="Leave session"
    //         />
    //         <input
    //           className="btn btn-large btn-success"
    //           type="button"
    //           id="buttonSwitchCamera"
    //           onClick={switchCamera}
    //           value="Switch Camera"
    //         />
    //       </div>

    //       {mainStreamManager !== undefined ? (
    //         <div id="main-video">
    //           <UserVideoComponent streamManager={mainStreamManager} />
    //         </div>
    //       ) : null}

    //       <div id="video-container">
    //         {/* {publisher !== undefined ?
    //             <div
    //             className="stream-container"
    //             onClick={() =>
    //                 handleMainVideoStream(publisher)
    //             }
    //             >
    //             <UserVideoComponent streamManager={publisher} />
    //             </div>
    //             : null} */}
    //         {/* 방 참가자들 */}
    //         {subscribers.map((sub) => (
    //           <div
    //             key={sub.id}
    //             className="stream-cvuontainer"
    //             // onClick={() => handleMainVideoStream(sub)}
    //           >
    //             <span>{sub.id}</span>
    //             <UserVideoComponent streamManager={sub} />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ) : null}
    // </div>
  );
};
export default OpenviduUiTest;

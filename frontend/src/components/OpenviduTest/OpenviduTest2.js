import { OpenVidu } from "openvidu-browser";
import { connect } from "react-redux";
import axios from "axios";
import React, { Component } from "react";
// import './App.css';
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";

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

const OpenviduTest2 = () => {

  const { state } = useLocation();
  const { userNickname, userNo } = useSelector(state => state.auth.user)

  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("");
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isMike, setMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isChat, setIsChat] = useState(true);
  const [myUserName, setMyUserName] = useState("");
  const [currentVideoDevice, setCurrentVideoDevice]=useState(null);

  const componentDidMount = () => {
    window.addEventListener("beforeunload", this.onbeforeunload);
    // 스터디방에서 화상회의 입장 -> props로 roomId로 받으면 세션id 업뎃 user 정보 전역변수 가져옴 -> 상태값 업뎃
  }

  const componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.joinRoom();
    return () => {
      window.removeEventListener("beforeunload", this.onbeforeunload);
    };
  }

  const onbeforeunload = (event) => {
    this.leaveSession();
  }

  const handleToggle = (kind) => {
    if (publisher) {
      switch (kind) {
        case "camera":
          this.setState({ isCamera: !isCamera }, () => {
            console.log(publisher);
            publisher.publishVideo(isCamera);
          });
          break;

        case "speaker":
          this.setState({ isSpeaker: !isSpeaker }, () => {
            subscribers.forEach((s) =>
              s.subscribeToAudio(isSpeaker)
            );
          });
          break;

        case "mike":
          this.setState({ isMike: !isMike }, () => {
            publisher.publishAudio(isMike);
          });
          break;
      }
    }
  }

  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  }

  //   handleChangeUserName(e) {
  //     this.setState({
  //       myUserName: e.target.value,
  //     });
  //   }

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
  }

  const deleteSubscriber = (streamManager) => {
    let subscribers = subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(
      subscribers[index].stream.connection.data
    ).clientData;
    console.log("제거할 이름", removeName);

    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
      console.error("나간 후 리스트", subscribers);
    }
  }

  const getToken1 = async() => {
    const response = await axios.post(
      APPLICATION_SERVER_URL,
      {
        userNo : userNo,
        userNickname : userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    const mySessionId=response.data;

    const res = await axios.put(
      APPLICATION_SERVER_URL + mySessionId,
      {
        userNo : userNo,
        userNickname : userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      
    console.log("토큰 만듬");
    console.log(res);
    
    return res.data;    
  }

  const getToken2 = async(sessionId) => {
    
    const res = await axios.put(
      APPLICATION_SERVER_URL + mySessionId,
      {
        userNo : userNo,
        userNickname : userNickname,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      
    console.log("토큰 만듬");
    console.log(res);
    
    return res.data;    
  }

  const initRoom = () => {
    const ov=new OpenVidu();

    ov.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    setSession(OV.initSession());

    const mySession=ov.initSession();
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

    getToken1().then((token) => {
      mySession
        .connect(token, { clientData :  "user1"})
        .then(async () => {
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
            mirror: true, // 거울모드
          });

          mySession.publish(publisher);
          console.log("퍼블리시 후");

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

  const joinRoom = () => {
    const ov=new OpenVidu();

    ov.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    console.log("방에 들어갑니다.");
    setSession(ov.initSession());

    const mySession=ov.initSession();
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

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
    getToken2(mySessionId).then((token) => {
        // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
            .connect(token, { clientData : myUserName })
            .then(async () => {
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = await this.OV.initPublisherAsync(undefined, {
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
            console.log("퍼블리시 후");

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

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    ov = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName(userNickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }

  const switchCamera = async() => {
    try {
      const devices = await ov.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
    return (
        <div className="container">
        {this.state.session === undefined ? (
            <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
                <SessionIdDiv>
                <h1> Join a video session </h1>
                </SessionIdDiv>
                <form className="form-group" onSubmit={this.initRoom}>
                <p className="text-center">
                    <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="INIT"
                    />
                </p>
                </form>
                <form className="form-group" onSubmit={this.joinRoom}>
                <p>
                    <label> Code: </label>
                    <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
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

        {this.state.session !== undefined ? (
            <div id="session">
            <div id="session-header">
                <SessionIdDiv>
                <h1 id="session-title">Room Code: {mySessionId}</h1>
                </SessionIdDiv>
                <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
                />
                <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
                />
            </div>

            {this.state.mainStreamManager !== undefined ? (
                <div id="main-video">
                <UserVideoComponent
                    streamManager={this.state.mainStreamManager}
                />
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
                {this.state.subscribers.map((sub, i) => (
                <div
                    key={sub.id}
                    className="stream-cvuontainer"
                    onClick={() => this.handleMainVideoStream(sub)}
                >
                    <span>{sub.id}</span>
                    <UserVideoComponent streamManager={sub} />
                </div>
                ))}
            </div>
            </div>
        ) : null}
        </div>
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(OpenviduTest2);

// 리덕스 state에 있는 값 사용할 때
const mapStateToProps = (state) => ({
  userInfo: state.auth,
});

// // 리덕스 slice의 actions 사용할 때
const mapDispatchToProps = (dispatch) => {
  return {};
};
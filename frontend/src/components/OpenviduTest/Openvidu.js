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

class Openvidu extends Component {
  constructor(props) {
    super(props);
    this.userRef = React.createRef();

    console.log(this.props);
    console.log(this.props.userInfo.user.userNickname);
    console.log(this.props.userInfo.token);

    let userNickname = this.props.userInfo.user.userNickname;
    // console.log(this.props.userInfo.user);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "",
      // myUserName: "Participant" + Math.floor(Math.random() * 10),
      myUserName: userNickname,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined, // 로컬 웹캠 스트림
      subscribers: [], // 다른 사용자의 활성 스트림
      isMike: true,
      isCamera: true,
      isSpeaker: true,
      isChat: false,

      // 게임 관련 변수
      t1Pos: 0,
      t2Pos: 0,
      // 게임 내 고유 번호
      myGameNo: 0,
      // 주사위 던지는 유저
      throwUser: 0,
      // 내가 주사위 던지는지 여부
      isDice: false,
      // 내 팀
      myTeam: 1,
      // 이번 턴에 게임 진행하는 여부
      gameTurn: true,
    };

    this.initRoom = this.initRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    // this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    // this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    // 스터디방에서 화상회의 입장 -> props로 roomId로 받으면 세션id 업뎃 user 정보 전역변수 가져옴 -> 상태값 업뎃
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.joinRoom();
    return () => {
      window.removeEventListener("beforeunload", this.onbeforeunload);
    };
  }

  componentWillUnmount() {
    // 게임 시작 전 게임 내 고유 번호 부여 (팀, 순서 구분 위함)
    this.state.gameNo = this.state.subscribers.length;
  }

  // 게임 시작 버튼을 통해 이벤트 받을 때
  gameStart(event) {
    this.sendGameResetSignal(this.state.subscribers).then((response) => {
      this.state.t1Pos = response.data.t1Pos;
      this.state.t2Pos = response.data.t2Pos;
      this.state.throwUser = response.data.throwUser;
    });

    /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(3000))------------------ */
    this.checkDiceTurn();
  }

  checkDiceTurn(event) {}

  async sendResetSignal(subscribers) {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: this.state.mySessionId,
        to: this.state.subscribers,
        type: "GAME_RESET",
        data: {
          // 변조 방지를 위한 게임 세팅 초기화
          t1Pos: 0,
          t2Pos: 0,
          throwUser: 0,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    console.log("게임이 시작하니 게임 상태를 초기로 되돌리라고 전달함");
    return response.data;
  }

  // onbeforeunload(event) {
  //   this.leaveSession();
  // }

  // handleToggle(kind) {
  //   if (this.state.publisher) {
  //     switch (kind) {
  //       case "camera":
  //         this.setState({ isCamera: !this.state.isCamera }, () => {
  //           console.log(this.state.publisher);
  //           this.state.publisher.publishVideo(this.state.isCamera);
  //         });
  //         break;

  //       case "speaker":
  //         this.setState({ isSpeaker: !this.state.isSpeaker }, () => {
  //           this.state.subscribers.forEach((s) =>
  //             s.subscribeToAudio(this.state.isSpeaker)
  //           );
  //         });
  //         break;

  //       case "mike":
  //         this.setState({ isMike: !this.state.isMike }, () => {
  //           this.state.publisher.publishAudio(this.state.isMike);
  //         });
  //         break;
  //     }
  //   }
  // }

  // handleChangeSessionId(e) {
  //   this.setState({
  //     mySessionId: e.target.value,
  //   });
  // }

  //   handleChangeUserName(e) {
  //     this.setState({
  //       myUserName: e.target.value,
  //     });
  //   }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    const removeName = JSON.parse(
      subscribers[index].stream.connection.data
    ).clientData;
    console.log("제거할 이름", removeName);

    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
      console.error("나간 후 리스트", subscribers);
    }
  }

  // initRoom() {
  //   // --- 1) Get an OpenVidu object ---

  //   this.OV = new OpenVidu();

  //   this.OV.setAdvancedConfiguration({
  //     publisherSpeakingEventsOptions: {
  //       interval: 50,
  //       threshold: -75,
  //     },
  //   });
  //   console.log("세션 생성 전");
  //   console.log(this.state);

  //   // --- 2) Init a session ---
  //   this.setState(
  //     {
  //       session: this.OV.initSession(),
  //     },
  //     () => {
  //       let mySession = this.state.session;
  //       console.log("세션 생성 후");
  //       console.log(this.state);
  //       // --- 3) Specify the actions when events take place in the session ---

  //       // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
  //       mySession.on("streamCreated", (event) => {
  //         // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
  //         // 요소 삽입X
  //         let subscriber = mySession.subscribe(event.stream, undefined);
  //         console.log(`전 ` + this.state.subscribers);
  //         var subscribers = this.state.subscribers;
  //         subscribers.push(subscriber);

  //         // Update the state with the new subscribers
  //         this.setState({
  //           subscribers: subscribers,
  //         });
  //         console.log(`후 ` + this.state.subscribers);
  //       });

  //       // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
  //       mySession.on("streamDestroyed", (event) => {
  //         // Remove the stream from 'subscribers' array
  //         this.deleteSubscriber(event.stream.streamManager);
  //       });

  //       // On every asynchronous exception...
  //       mySession.on("exception", (exception) => {
  //         console.warn(exception);
  //       });

  //       // 게임 관련 로직 모음
  //       mySession.on("TURN_UPDATE", (data) => {
  //         const { nextT1Pos, nextT2Pos, beforeGameNo } = JSON.parse(data.data);
  //         console.log(
  //           "팀1 다음 포지션 : " +
  //             nextT1Pos +
  //             ", 팀2 다음 포지션 : " +
  //             nextT2Pos +
  //             ", 이전에 던진 유저 고유넘버 : " +
  //             beforeGameNo
  //         );

  //         // 각 팀 포지션 업데이트
  //         this.state.t1Pos = nextT1Pos;
  //         this.state.t1Pos = nextT2Pos;

  //         // 주사위 던짐 여부 테스트
  //         if ((beforeGameNo + 1) % 6 == this.state.gameNo) {
  //           this.state.isDice = true;
  //           console.log("당신은 다음 턴에 주사위를 던집니다.");
  //         } else {
  //           this.state.isDice = false;
  //           console.log("당신은 다음 턴에 주사위를 던지지 않습니다.");
  //         }
  //       });

  //       // --- 4) Connect to the session with a valid user token ---

  //       // Get a token from the OpenVidu deployment
  //       this.host().then((token) => {
  //         // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
  //         // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
  //         mySession
  //           .connect(token, { clientData: this.state.myUserName })
  //           .then(async () => {
  //             // --- 5) Get your own camera stream ---

  //             // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
  //             // element: we will manage it on our own) and with the desired properties
  //             let publisher = await this.OV.initPublisherAsync(undefined, {
  //               audioSource: undefined, // The source of audio. If undefined default microphone
  //               videoSource: undefined, // The source of video. If undefined default webcam
  //               publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //               publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //               resolution: "251.2x188.4", // 해상도
  //               frameRate: 30, // The frame rate of your video
  //               insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
  //               mirror: true, // 거울모드
  //             });
  //             // --- 6) Publish your stream ---

  //             mySession.publish(publisher);
  //             console.log("퍼블리시 후");
  //             console.log(this.state);
  //             // Obtain the current video device in use
  //             var devices = await this.OV.getDevices();
  //             var videoDevices = devices.filter(
  //               (device) => device.kind === "videoinput"
  //             );
  //             var currentVideoDeviceId = publisher.stream
  //               .getMediaStream()
  //               .getVideoTracks()[0]
  //               .getSettings().deviceId;
  //             var currentVideoDevice = videoDevices.find(
  //               (device) => device.deviceId === currentVideoDeviceId
  //             );

  //             // Set the main video in the page to display our webcam and store our Publisher
  //             this.setState({
  //               currentVideoDevice: currentVideoDevice,
  //               mainStreamManager: publisher,
  //               publisher: publisher,
  //             });
  //           })
  //           .catch((error) => {
  //             console.log(
  //               "There was an error connecting to the session:",
  //               error.code,
  //               error.message
  //             );
  //           });
  //       });
  //     }
  //   );
  // }

  // joinRoom() {
  //   this.OV = new OpenVidu();

  //   this.OV.setAdvancedConfiguration({
  //     publisherSpeakingEventsOptions: {
  //       interval: 50,
  //       threshold: -75,
  //     },
  //   });

  //   console.log("방에 들어갑니다.");
  //   console.log(this.state);
  //   this.setState(
  //     {
  //       session: this.OV.initSession(),
  //     },
  //     () => {
  //       console.log(this.state);
  //       let mySession = this.state.session;

  //       // --- 3) Specify the actions when events take place in the session ---

  //       // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
  //       mySession.on("streamCreated", (event) => {
  //         // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
  //         // 요소 삽입X
  //         let subscriber = mySession.subscribe(event.stream, undefined);
  //         console.log(`전 ` + this.state.subscribers);
  //         var subscribers = this.state.subscribers;
  //         subscribers.push(subscriber);

  //         // Update the state with the new subscribers
  //         this.setState({
  //           subscribers: subscribers,
  //         });
  //         console.log(`후 ` + this.state.subscribers);
  //       });

  //       // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
  //       mySession.on("streamDestroyed", (event) => {
  //         // Remove the stream from 'subscribers' array
  //         this.deleteSubscriber(event.stream.streamManager);
  //       });

  //       // On every asynchronous exception...
  //       mySession.on("exception", (exception) => {
  //         console.warn(exception);
  //       });

  //       // --- 4) Connect to the session with a valid user token ---

  //       // Get a token from the OpenVidu deployment
  //       this.guest(this.state.mySessionId).then((token) => {
  //         // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
  //         // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
  //         mySession
  //           .connect(token, { clientData: this.state.myUserName })
  //           .then(async () => {
  //             // --- 5) Get your own camera stream ---

  //             // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
  //             // element: we will manage it on our own) and with the desired properties
  //             let publisher = await this.OV.initPublisherAsync(undefined, {
  //               audioSource: undefined, // The source of audio. If undefined default microphone
  //               videoSource: undefined, // The source of video. If undefined default webcam
  //               publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //               publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //               resolution: "251.2x188.4", // 해상도
  //               frameRate: 30, // The frame rate of your video
  //               insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
  //               mirror: true, // Whether to mirror your local video or not
  //             });

  //             // --- 6) Publish your stream ---

  //             mySession.publish(publisher);

  //             // Obtain the current video device in use
  //             var devices = await this.OV.getDevices();
  //             var videoDevices = devices.filter(
  //               (device) => device.kind === "videoinput"
  //             );
  //             var currentVideoDeviceId = publisher.stream
  //               .getMediaStream()
  //               .getVideoTracks()[0]
  //               .getSettings().deviceId;
  //             var currentVideoDevice = videoDevices.find(
  //               (device) => device.deviceId === currentVideoDeviceId
  //             );

  //             // Set the main video in the page to display our webcam and store our Publisher
  //             this.setState({
  //               currentVideoDevice: currentVideoDevice,
  //               mainStreamManager: publisher,
  //               publisher: publisher,
  //             });
  //           })
  //           .catch((error) => {
  //             console.log(
  //               "There was an error connecting to the session:",
  //               error.code,
  //               error.message
  //             );
  //           });
  //       });
  //     }
  //   );
  // }

  // leaveSession() {
  //   // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

  //   const mySession = this.state.session;

  //   if (mySession) {
  //     mySession.disconnect();
  //   }

  //   // Empty all properties...
  //   this.OV = null;
  //   this.setState({
  //     session: undefined,
  //     subscribers: [],
  //     mySessionId: "SessionA",
  //     // myUserName: "Participant" + Math.floor(Math.random() * 10),
  //     myUserName: this.userNickname,
  //     mainStreamManager: undefined,
  //     publisher: undefined,
  //   });
  // }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV.getDevices();
  //     var videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = this.OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await this.state.session.unpublish(this.state.mainStreamManager);

  //         await this.state.session.publish(newPublisher);
  //         this.setState({
  //           currentVideoDevice: newVideoDevice[0],
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // render() {
  //   const mySessionId = this.state.mySessionId;
  //   // const myUserName = this.state.myUserName;

  //   return (
  //     <div className="container">
  //       {this.state.session === undefined ? (
  //         <div id="join">
  //           <div id="join-dialog" className="jumbotron vertical-center">
  //             <SessionIdDiv>
  //               <h1> Join a video session </h1>
  //             </SessionIdDiv>
  //             <form className="form-group" onSubmit={this.initRoom}>
  //               <p className="text-center">
  //                 <input
  //                   className="btn btn-lg btn-success"
  //                   name="commit"
  //                   type="submit"
  //                   value="INIT"
  //                 />
  //               </p>
  //             </form>
  //             <form className="form-group" onSubmit={this.joinRoom}>
  //               <p>
  //                 <label> Code: </label>
  //                 <input
  //                   className="form-control"
  //                   type="text"
  //                   id="sessionId"
  //                   value={mySessionId}
  //                   onChange={this.handleChangeSessionId}
  //                   required
  //                 />
  //               </p>
  //               <p className="text-center">
  //                 <input
  //                   className="btn btn-lg btn-success"
  //                   name="commit"
  //                   type="submit"
  //                   value="JOIN"
  //                 />
  //               </p>
  //             </form>
  //           </div>
  //         </div>
  //       ) : null}

  //       {this.state.session !== undefined ? (
  //         <div id="session">
  //           <div id="session-header">
  //             <SessionIdDiv>
  //               <h1 id="session-title">Room Code: {mySessionId}</h1>
  //             </SessionIdDiv>
  //             <input
  //               className="btn btn-large btn-danger"
  //               type="button"
  //               id="buttonLeaveSession"
  //               onClick={this.leaveSession}
  //               value="Leave session"
  //             />
  //             <input
  //               className="btn btn-large btn-success"
  //               type="button"
  //               id="buttonSwitchCamera"
  //               onClick={this.switchCamera}
  //               value="Switch Camera"
  //             />
  //           </div>

  //           {this.state.mainStreamManager !== undefined ? (
  //             <div id="main-video">
  //               <UserVideoComponent
  //                 streamManager={this.state.mainStreamManager}
  //               />
  //             </div>
  //           ) : null}

  //           <div id="video-container">
  //             {/* {this.state.publisher !== undefined ?
  //             <div
  //               className="stream-container"
  //               onClick={() =>
  //                 this.handleMainVideoStream(this.state.publisher)
  //               }
  //             >
  //               <UserVideoComponent streamManager={this.state.publisher} />
  //             </div>
  //               : null} */}
  //             {/* 방 참가자들 */}
  //             {this.state.subscribers.map((sub, i) => (
  //               <div
  //                 key={sub.id}
  //                 className="stream-cvuontainer"
  //                 onClick={() => this.handleMainVideoStream(sub)}
  //               >
  //                 <span>{sub.id}</span>
  //                 <UserVideoComponent streamManager={sub} />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   );
  // }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  // async host() {
  //   const sessionId = await this.createSession();
  //   this.state.mySessionId = sessionId;
  //   return await this.createToken(sessionId);
  // }

  // async guest() {
  //   return await this.createToken(this.state.mySessionId);
  // }

  // async createSession() {
  //   console.log(token);
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL,
  //     //더미 데이터
  //     {
  //       userNo: 1,
  //       userNickname: this.state.userNickname,
  //     },
  //     {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log("세션 만듬");
  //   return response.data; // The sessionId
  // }

  // async createToken(sessionId) {
  //   const response = await axios.put(
  //     APPLICATION_SERVER_URL + sessionId,
  //     //더미 데이터
  //     {
  //       userNo: 1,
  //       userNickname: this.state.userNickname,
  //     },
  //     {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log("토큰 만듬");
  //   return response.data; // The token
  // }

  // 각 팀 말의 포지션 업데이트
  async sendPos(subscribers) {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: this.state.mySessionId,
        to: this.state.subscribers,
        type: "TURN_UPDATE",
        data: {
          t1Pos: this.state.t1Pos,
          t2Pos: this.state.t2Pos,
          throwUser: this.state.throwUser,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    console.log("위치 전송함");
    return response.data;
  }
}

// 리덕스 state에 있는 값 사용할 때
const mapStateToProps = (state) => ({
  userInfo: state.auth,
});

// 리덕스 slice의 actions 사용할 때
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Openvidu);

// export default Openvidu;

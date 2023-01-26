import { OpenVidu } from "openvidu-browser";
import { useState } from "react";

// const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
// const OPENVIDU_SERVER_SECRET = "MY_SECRET";

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
      mySession.connect(token, { clientData: myUserName }).then(async () => {
        let tempPublisher = newOv.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---

        mySession.publish(tempPublisher);

        // Obtain the current video device in use
        //   var devices = await this.OV.getDevices();
        //   var videoDevices = devices.filter(device => device.kind === 'videoinput');
        //   var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
        //   var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
      });
    });
  };

  // Token 관련 로직 (async await 생략?)
  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };

  const createSession = () => {};

  const createToken = () => {};

  return (
    <div>
      <h3>OpenVidu 메인 코드가 작성될 곳입니다.</h3>
    </div>
  );
};

export default OpenViduMain;

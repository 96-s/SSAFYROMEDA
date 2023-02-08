import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';


const Container = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 19.5px;
`

const Page = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  // align-items: center;
  height: 100%;
  width: 100%;
`

const APPLICATION_SERVER_URL = "https://i8d205.p.ssafy.io/api/rooms/"; //process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const temp = localStorage.getItem("persist:root");
let token = "";
if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  token = temp3.token;
}

const GamePage = () => {
  const { state } = useLocation();
  const { userNickname, userNo } = useSelector(state => state.auth.user)

  const [session, setSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [isMike, setMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [myUserName, setMyUserName] = useState("");
  const [currentVideoDevice, setCurrentVideoDevice]=useState(null);

  const getToken = async() => {
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

  useEffect(() => {
    const OV = new OpenVidu();

    OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    // setSession(OV.initSession());

    const mySession=OV.initSession();
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

    getToken().then((token) => {
      mySession
        .connect(token, { clientData :  "user1"})
        .then(async () => {
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
            mirror: true, // 거울모드
          });

          mySession.publish(publisher);
          console.log("퍼블리시 후");
          console.log(this.state);

          // Obtain the current video device in use
          var devices = await this.OV.getDevices();
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

  }, []);

  return (
    <Page>
      <Container>
        <OurTeamVid/>
        <Map/>
        <TheirTeamVid/>
      </Container>
    </Page>
  );
};

export default GamePage;

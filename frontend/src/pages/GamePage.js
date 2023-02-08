import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import UserVideoComponent from "./UserVideoComponent";

import styled from "styled-components";
import axios from 'axios';
import React from 'react';

import { useLocation } from "react-router";
import { useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const [subscribers, setSubscribers] = useState([]);
  const [isMike, setMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [myUserName, setMyUserName] = useState("");
  const [currentVideoDevice, setCurrentVideoDevice]=useState(null);
  // const [ov, setOv] = useState(null);

  const userRef=React.createRef();

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

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  useEffect(() => {
    const ov=new OpenVidu();

    ov.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

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

    getToken().then((token) => {
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
    
  }, []);

  return (
    <div id = "session">
      <div id="main-video">
        <UserVideoComponent streamManager={mainStreamManager}/>
      </div>
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
            onClick={() => handleMainVideoStream(sub)}
          >
            <span>{sub.id}</span>
            <UserVideoComponent streamManager={sub} />
          </div>
        ))}
      </div>
    </div>
    // <Page>
    //   <Container>
    //     <OurTeamVid/>
    //     <Map/>
    //     <TheirTeamVid/>
    //   </Container>
    // </Page>
  );
};

export default GamePage;

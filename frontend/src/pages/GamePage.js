import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useState } from "react";
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

  const [session, setSession] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [mainStreamManager, setMainStreamManager] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [isMike, setMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [myUserName, setMyUserName] = useState("");

  const getToken = async() => {
    const response = await axios.post(
      APPLICATION_SERVER_URL,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const mySessionId=response.data;
      const res = await axios.post(
        APPLICATION_SERVER_URL+mySessionId,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    console.log("토큰 만듬");
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

    setSessionId(OV.initSession());

    let mySession=session;
    console.log("세션 생성 후");

    // mySession.on("streamCreated", (event) => {
    //   // OpenVidu -> Session -> UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
    //   // 요소 삽입X
    //   let subscriber = mySession.subscribe(event.stream, undefined);
    //   var subscribers = this.state.subscribers;
    //   subscribers.push(subscriber);

    //   // Update the state with the new subscribers
    //   setSubscribers(subscribers);
    // });

    // // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
    // mySession.on("streamDestroyed", (event) => {
    //   // Remove the stream from 'subscribers' array
    //   this.deleteSubscriber(event.stream.streamManager);
    // });

    // // On every asynchronous exception...
    // mySession.on("exception", (exception) => {
    //   console.warn(exception);
    // });

    const response = getToken();
    const token=response.data;
    console.log(token);
    // mySession.connect(token, {clientData : my})

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

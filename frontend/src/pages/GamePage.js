import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 20px;
`

const Page = styled.div`
  height: 100%;
  width: 100%;
`

const GamePage = ({
  ov,
  session,
  mySessionId,
  mainStreamManager,
  publisher,
  subscribers,
  isMike,
  isCamera,
  isSpeaker,
  myUserName,
  currentVideoDevice,
  initRoom,
  joinRoom,
  leaveSession,
  deleteSubsciber,
  userNickname,
  userNo,
}) => {

  return (
    <Page>
      <Container>
        <OurTeamVid
          streamManager={mainStreamManager}
          subscribers={subscribers}
          publisher={publisher}
          userNickname={userNickname}
          userNo={userNo}
        />
        <Map/>
        <TheirTeamVid
          streamManager={mainStreamManager}
          subscribers={subscribers}
          publisher={publisher}
          userNickname={userNickname}
          userNo={userNo}
        />
      </Container>
    </Page>
  );
};

export default GamePage;
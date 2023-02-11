import styled from "styled-components";
import UserVideoComponent from "components/OpenviduTest/UserVideoComponent";

const Box = styled.div`
  border: 1px solid black;
  height: 25vh;
  aspect-ratio: 4 / 3;
`;



const Page = styled.div`
  margin: auto;
`;

const Video = styled.div`
  margin: 3vh;
`;

const MiddleBox = styled.div`
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const OurTeamVid = ({ 
  mainStreamManager, subscribers, publisher, userNickname, userNo}) => {
  return (
    <Page>
      <Video>
        <Box>
          {mainStreamManager !== undefined ? (
            <UserVideoComponent 
              streamManager={mainStreamManager}
              userNickname={userNickname}
              userNo={userNo}
            />
          ) : null}
          <div>
            <UserVideoComponent 
              streamManager={publisher}
              userNickname={userNickname}
              userNo={userNo}
            />
          </div>
        </Box>
        <MiddleBox>
          <Box>
            {mainStreamManager !== undefined ? (
              <UserVideoComponent
                streamManager={mainStreamManager} 
                userNickname={userNickname}
                userNo={userNo}
              />
            ) : null}
            <div>
              <UserVideoComponent 
                streamManager={subscribers[0]}
                userNickname={userNickname}
                userNo={userNo}
              />
            </div>
          </Box>
        </MiddleBox>
        <Box>
          {mainStreamManager !== undefined ? (
            <UserVideoComponent
              streamManager={mainStreamManager}
              userNickname={userNickname}
              userNo={userNo}
            />
          ) : null}
          <div>
            <UserVideoComponent
              streamManager={subscribers[1]}
              userNickname={userNickname}
              userNo={userNo}
            />
          </div>
        </Box>
      </Video>
    </Page>
  );
};

export default OurTeamVid;

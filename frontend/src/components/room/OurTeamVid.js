import styled from "styled-components";
import UserVideoComponent from "components/OpenviduTest/UserVideoComponent";

const Box = styled.div`
  border: 1px solid black;
  height: 25vh;
  aspect-ratio: 4 / 3;
  margin: auto;
`;

const Page = styled.div`
  width:90%;
`;

const Video = styled.div`
  width: 100%;
  margin: 3px;
`;

const MiddleBox = styled.div`
  margin-top: 6vh;
  margin-bottom: 6vh;
`;

const OurTeamVid = ({
  streamManager,
  subscribers,
  publisher,
  team1Members,
}) => {
  console.log("team1 : ");
  console.log(team1Members);

  return (
    <Page>
      <Video>
        <Box>
          {streamManager !== undefined ? (
            <UserVideoComponent streamManager={streamManager} />
          ) : null}
          <div>
            <UserVideoComponent streamManager={publisher} />
          </div>
        </Box>
        <MiddleBox>
          <Box>
            {streamManager !== undefined ? (
              <UserVideoComponent streamManager={streamManager} />
            ) : null}
            <div>
              <UserVideoComponent streamManager={subscribers[0]} />
            </div>
          </Box>
        </MiddleBox>
        <Box>
          {streamManager !== undefined ? (
            <UserVideoComponent streamManager={streamManager} />
          ) : null}
          <div>
            <UserVideoComponent streamManager={subscribers[1]} />
          </div>
        </Box>
      </Video>
    </Page>
  );
};

export default OurTeamVid;

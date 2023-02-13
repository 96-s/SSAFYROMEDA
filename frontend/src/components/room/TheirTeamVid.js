import styled from "styled-components";
import UserVideoComponent from "components/OpenviduTest/UserVideoComponent";

const Box = styled.div`
  border: 1px solid black;
  height: 25vh;
  aspect-ratio: 4 / 3;
`;
// const Nickname = styled.div`
//   text-align: center;
// `;
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

const TheirTeamVid = ({ mainStreamManager, subscribers, publisher, team2Members }) => {
  return (
    <Page>
      <Video>
        <Box>
          {mainStreamManager !== undefined ? (
            <UserVideoComponent streamManager={mainStreamManager} />
          ) : null}
          <div>
            <UserVideoComponent streamManager={subscribers[2]} />
          </div>
        </Box>
        <MiddleBox>
          <Box>
            {mainStreamManager !== undefined ? (
              <UserVideoComponent streamManager={mainStreamManager} />
            ) : null}
            <div>
              <UserVideoComponent streamManager={subscribers[3]} />
            </div>
          </Box>
        </MiddleBox>
        <Box>
          {mainStreamManager !== undefined ? (
            <UserVideoComponent streamManager={mainStreamManager} />
          ) : null}
          <div>
            <UserVideoComponent streamManager={subscribers[4]} />
          </div>
        </Box>
      </Video>
    </Page>
  );
};

export default TheirTeamVid;

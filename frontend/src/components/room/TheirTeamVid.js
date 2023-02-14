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

const TheirTeamVid = ({ streamManager, subscribers, publisher, team2Members }) => {

  console.log("team2 : ");
  console.log(team2Members);

  return (
    <Page>
      <Video>
        <Box>
          {streamManager !== undefined ? (
            <UserVideoComponent streamManager={streamManager} />
          ) : null}
          <div>
            <UserVideoComponent streamManager={subscribers[2]} />
          </div>
        </Box>
        <MiddleBox>
          <Box>
            {streamManager !== undefined ? (
              <UserVideoComponent streamManager={streamManager} />
            ) : null}
            <div>
              <UserVideoComponent streamManager={subscribers[3]} />
            </div>
          </Box>
        </MiddleBox>
        <Box>
          {streamManager !== undefined ? (
            <UserVideoComponent streamManager={streamManager} />
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

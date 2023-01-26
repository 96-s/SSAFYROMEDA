import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Page = styled.div`
  height: 100%;
`


const GamePage = () => {
  return (
    <Page>
      <h1>GamePage</h1>
      <Container>
        <OurTeamVid/>
        <Map/>
        <TheirTeamVid/>
      </Container>
    </Page>
  );
};

export default GamePage;

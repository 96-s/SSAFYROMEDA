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
`


const GamePage = () => {
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

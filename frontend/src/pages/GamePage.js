import OurTeamVid from "components/room/OurTeamVid";
import Map from "components/room/Map";
import TheirTeamVid from "components/room/TheirTeamVid";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 19.5px;
`

const Page = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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

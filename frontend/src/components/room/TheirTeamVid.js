import styled from "styled-components";

const Box = styled.div`
    border: 1px solid black;
    height: 25vh;
    aspect-ratio: 4 / 3;
`;
const Nickname = styled.div`
    text-align: center;
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


const TheirTeamVid = () => {
    return (
      <Page>
        <Video>
          <Box>1</Box>
              <Nickname>닉네임: 가가가가</Nickname>
          <MiddleBox>
            <Box>2</Box>
            <Nickname>닉네임: 가가가가</Nickname>
          </MiddleBox>
          <Box>3</Box>
              <Nickname>닉네임: 가가가가</Nickname>
        </Video>
      </Page>
    );
}

export default TheirTeamVid;
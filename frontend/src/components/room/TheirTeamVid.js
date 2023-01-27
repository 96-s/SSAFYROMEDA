import styled from "styled-components";

const Box = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 189.3px;
    margin-top: 5px;
    margin-bottom: 5px;
`;
const Nickname = styled.div`
    text-align: center;
`;
const Video = styled.div`
    margin: 20px;
`

const TheirTeamVid = () => {
    return (
      <Video>
          <Box>1</Box>
              <Nickname>닉네임: 가가가가</Nickname>
          <Box>2</Box>
              <Nickname>닉네임: 가가가가</Nickname>
          <Box>3</Box>
              <Nickname>닉네임: 가가가가</Nickname>
      </Video>
    );
}

export default TheirTeamVid;
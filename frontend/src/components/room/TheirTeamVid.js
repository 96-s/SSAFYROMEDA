import styled from "styled-components";

const Box = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 250px;
`


const TheirTeamVid = () => {
    return (
      <div className="container">
        <Box>1</Box>
        닉네임: 라라라라
        <Box>2</Box>
        닉네임: 마마마마
        <Box>3</Box>
        닉네임: 바바바바
      </div>
    );
}

export default TheirTeamVid;
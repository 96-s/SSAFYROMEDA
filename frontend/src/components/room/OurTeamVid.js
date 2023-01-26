import styled from "styled-components";

const Box = styled.div`
    border: 1px solid black;
    width: 300px;
    height: 250px;
`

const OurTeamVid = () => {
    return (
        <div className="container">
            <Box>
                1
            </Box>
            닉네임: 가가가가
            <Box>
                2
            </Box>
            닉네임: 나나나나
            <Box>
                3
            </Box>
            닉네임: 다다다다
        </div>
    )
}

export default OurTeamVid;
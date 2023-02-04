import styled from "styled-components";
import TypingText from "components/utils/Typing";
import MyButton from "components/common/Button";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 19.5px;
  width: 50%
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ButtonDiv = styled.div`

`;



const ExplanationPage = () => {
    const navigate = useNavigate();

    const toLobby = () => {
        navigate('/lobby')
    }

    return (
      <Page>
        <Container>
            <TypingText text="싸피로메다 행성에 외계인들이 침공했다.
            이들은 우주인들을 자신들과 같은 종족으로 만들어버리는 무시무시한 외계인들이다!
            아직 외계인들이 침공하지 않은 평화로운 지구로 도망가야한다.
            지구에 도착할 수 있는 우주선은 단 1대.
            가장 먼저 지구에 도착해야한다." speed={60} fontSize="1.25rem" color="black" />
        </Container>
        <ButtonDiv>
            <MyButton
            lang={"Korean"}
            text={"　탈출하기　"}
            type={"is-primary"}
            onClick={toLobby}
            />
        </ButtonDiv>
      </Page>
    );
  };
  
  export default ExplanationPage;
  
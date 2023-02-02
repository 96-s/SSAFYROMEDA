import SignUpForm from "components/auth/SingUpForm";
import styled from "styled-components";

//IMAGE Components
import background from "resources/images/back.PNG";

const BackGround = styled.div`
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex-wrap: wrap;
  align-items: center;

  margin-top: 130px;
`;

const TitleText = styled.h1`
  font-size: 6rem;
  letter-spacing: 1rem;
  color: white;

  margin-bottom: 60px;
`;

const InputBox = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid #b4b4dc;
  border-radius: 10px;
`;

const SignUpPage = () => {
  return (
    <>
      <BackGround>
        <TitleContainer>
          <TitleText>NICKNAME</TitleText>
          <InputBox>
            <SignUpForm />
          </InputBox>
        </TitleContainer>
      </BackGround>
    </>
  );
};

export default SignUpPage;

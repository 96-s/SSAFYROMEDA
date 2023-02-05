import styled from "styled-components";
import Login from "../components/auth/Login";
import { useEffect } from "react";
import { authActions } from "store/AuthSlice";
import { useDispatch } from "react-redux";

//IMAGE Components
// import background from "resources/images/back.PNG";
import bg from "resources/images/bg.png";

const BackGround = styled.div`
  background: url(${bg}) no-repeat center;
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

const ButtonBox = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid #b4b4dc;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginText = styled.div`
  font-size: 1.25rem;
  color: white;

  margin-top: -30px;
  margin-bottom: 30px;
`;

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.reset());
  }, [dispatch]);

  return (
    <>
      <BackGround>
        <TitleContainer>
          <TitleText>LOGIN</TitleText>
          <ButtonBox>
            <LoginText>카카오로 시작하기</LoginText>
            <Login />
          </ButtonBox>
        </TitleContainer>
      </BackGround>
    </>
  );
};

export default LoginPage;

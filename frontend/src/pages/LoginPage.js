import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import { useEffect } from "react";
import { authActions } from "store/AuthSlice";
import { useDispatch } from "react-redux";

//IMAGE Components
import background from "resources/images/back.PNG";

const BackGround = styled.div`
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
`;

const Titlediv = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.reset());
  }, [dispatch]);

  return (
    <>
      <BackGround>
        <Titlediv>Login</Titlediv>
        <LoginForm />
      </BackGround>
    </>
  );
};

export default LoginPage;

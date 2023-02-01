import LoginForm from "../components/auth/LoginForm";
import { useEffect } from "react";
import { authActions } from "store/AuthSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.reset());
  }, [dispatch]);

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import MyButton from "components/common/button";

const LoginForm = () => {
  return (
    <div>
      <h3>Login Form</h3>
      <MyButton
        type={"is-success"}
        lang={"English"}
        text={"START"}
        onClick={() => {}}
      />
      <MyButton
        type={"is-error"}
        lang={"Korean"}
        text={"시작하기"}
        onClick={() => {}}
      />
    </div>
  );
};

export default LoginForm;

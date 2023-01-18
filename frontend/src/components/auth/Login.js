// 카카오 로그인
import kakaoBtn from "resources/images/kakao_login_M.png";

import { KAKAO_AUTH_URL } from "./OAuth";

const kakaoLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};

const Login = () => {
  return (
    <div>
      <img src={kakaoBtn} alt={"카카오로그인"} onClick={kakaoLogin} />
    </div>
  );
};

export default Login;

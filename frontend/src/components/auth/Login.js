// 카카오 로그인
import kakaoBtn from "resources/images/kakao_login_M.png";
import styled from "styled-components";

import { CursorURL } from "components/common/CursorURL";

const KakaoButton = styled.img`
  cursor: url(${CursorURL}) 14 0, pointer;
`;

const kakaoLogin = () => {
  const KAKAO_AUTH_URL =
    "https://i8d205.p.ssafy.io/api/oauth2/authorization/kakao";
  window.location.href = KAKAO_AUTH_URL;
};

const Login = () => {
  return (
    <div>
      <KakaoButton
        src={kakaoBtn}
        alt={"카카오로그인"}
        onClick={kakaoLogin}
      ></KakaoButton>
    </div>
  );
};
export default Login;

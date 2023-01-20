import { useDispatch } from "react-redux";
import { authActions } from "store/AuthSlice";
import React from "react";

// 리다이렉트되는 화면
const KakaoRedirect = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(async () => {
    await dispatch(authActions.kakaoLogin(code));
  }, []);

  return (
    <div>
      <h2>로그인중..</h2>
    </div>
  );
};

export default KakaoRedirect;

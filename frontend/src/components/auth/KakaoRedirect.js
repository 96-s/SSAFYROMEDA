import { useDispatch } from "react-redux";
import { authActions } from "store/AuthSlice";
import React, { useEffect } from "react";

// 리다이렉트되는 화면
const KakaoRedirect = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  // React.useEffect(async () => {
  //   await dispatch(authActions.kakaoLoginStart(code));
  // }, []);

  useEffect(() => {
    console.log("테스트");
    dispatch(authActions.kakaoLoginStart(code));
  }, [dispatch, code]);

  return (
    <div>
      <h2>로그인중..</h2>
    </div>
  );
};

export default KakaoRedirect;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import { parseJwt } from "components/utils/ParseJwt";

const OauthRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let token = useLocation().search.split("=")[1];
  let userEmail = parseJwt(token).email;
  console.log("현재 유저 이메일", userEmail);

  // const tempToken1 = localStorage.getItem("token");
  // const tempToken2 = localStorage.getItem("auth");
  // const tempToken3 = localStorage.getItem("persist:root");

  //   const email = useSelector((state) => state.auth.register.userEmail);

  useEffect(() => {
    // 받아온 이메일과 토큰을 redux에 저장
    if (userEmail) {
      dispatch(authActions.addTokenEmail({ token, userEmail }));
      console.log("이메일 및 토큰 저장 성공");
      navigate("/signup");
    }
  }, [userEmail, dispatch]);

  return (
    <div>
      <h3>토큰을 빼오는 곳입니다 ㅎㅎ</h3>
    </div>
  );
};

export default OauthRedirect;

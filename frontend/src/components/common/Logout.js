import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useState } from "react";
import logout from "resources/images/logout_icon.png";

import { persistor } from "../../store/index";
import PixelModal from "./PixelModal";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temp = useSelector((state) => state.auth);

  // const logoutRequesthandle = () => {
  //   const userNo = temp.user.userNo;
  //   console.log("로그아웃 전 userNo 확인: ", userNo);
  //   dispatch(authActions.logoutRequestStart(userNo));
  // };

  // 로그아웃 되었다는 알림창 필요
  const purge = async () => {
    await navigate("/");
    await persistor.purge();
  };

  return (
    <div>
      <img
        className="nes-pointer"
        src={logout}
        onClick={purge}
        width="60px"
        alt="로그아웃"
      />
    </div>
  );
};

export default Logout;

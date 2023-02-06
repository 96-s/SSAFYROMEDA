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
  console.log("테스트: ", temp);

  // const { user } = useSelector((state) => ({
  //   user: state.auth.user,
  // }));

  const logoutRequesthandle = () => {
    const userNo = temp.user.userNo;
    console.log("로그아웃 전 userNo 확인: ", userNo);
    dispatch(authActions.logoutRequestStart(userNo));
  };

  // const logoutRequest = () => {
  //   logoutApi(userNo)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // 로그아웃 되었다는 알림창 필요
  const purge = async () => {
    await persistor.purge();
    await navigate("/");
  };

  return (
    <div>
      <img
        className="nes-pointer"
        src={logout}
        onClick={() => {
          logoutRequesthandle();
          purge();
        }}
        width="60px"
        alt="로그아웃"
      />
    </div>
  );
};

export default Logout;

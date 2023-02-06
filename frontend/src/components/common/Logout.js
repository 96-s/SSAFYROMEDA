import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import logout from "resources/images/logout_icon.png";

import { persistor } from "../../store/index";
import PixelModal from "./PixelModal";

import { logoutApi } from "../../store/api";

const Logout = () => {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));

  const userNo = user.userNo;

  const navigate = useNavigate();

  const logoutRequest = () => {
    logoutApi(userNo)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          logoutRequest();
          purge();
        }}
        width="60px"
        alt="로그아웃"
      />
    </div>
  );
};

export default Logout;

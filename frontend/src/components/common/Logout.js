import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logout from "resources/images/logout_icon.png";

import { persistor } from "../../store/index";
import PixelModal from "./PixelModal";

const Logout = () => {
  const navigate = useNavigate();

  // 로그아웃 되었다는 알림창 필요
  const purge = async () => {
    await persistor.purge();
    await navigate("/");
  };

  return (
    <div>
      <img src={logout} onClick={purge} width="60px"/>
    </div>
  );
};

export default Logout;

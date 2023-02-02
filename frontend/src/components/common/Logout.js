import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { persistor } from "../../store/index";
import MyButton from "./Button";
import PixelModal from "./PixelModal";

const Logout = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  // 로그아웃 되었다는 알림창 필요
  const purge = async () => {
    await persistor.purge();
    await navigate("/");
  };

  return (
    <div>
      <MyButton
        lang={"Korean"}
        text={"로그아웃"}
        type={"is-warning"}
        onClick={purge}
      />
    </div>
  );
};

export default Logout;

import GameManager from "components/Game/GameManager";
import { useLocation } from "react-router-dom";

const UiTest = () => {
  const location = useLocation();
  // const sessionNickname = location.state.sessionNickname;
  // const sessionRoomId = location.state.sessionRoomId;
  // const sessionCapacity = location.state.sessionCapacity;
  // const sessionHost = location.state.sessionHost;

  return (
    <div>
      <GameManager
        // sessionNickname={sessionNickname}
        // sessionRoomId={sessionRoomId}
        // sessionCapacity={sessionCapacity}
        // sessionHost={sessionHost}
      />
    </div>
  );
};

export default UiTest;

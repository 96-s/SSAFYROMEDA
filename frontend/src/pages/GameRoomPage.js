import GameRoom from "components/OpenviduTest/GameRoom";
import { useLocation } from "react-router";

const GameRoomPage = () => {
  // const location = useLocation();
  // console.log(location);
  // const sessionNickname = location.state.sessionNickname;
  // const sessionRoomId = location.state.sessionRoomId;
  // const sessionCapacity = location.state.sessionCapacity;
  // const sessionHost = location.state.sessionHost;

  return (
    <GameRoom
    // sessionNickname={sessionNickname}
    // sessionRoomId={sessionRoomId}
    // sessionCapacity={sessionCapacity}
    // sessionHost={sessionHost}
    />
  );
};

export default GameRoomPage;

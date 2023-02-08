import OpenViduBlock from "components/OpenviduBlock/OpenViduBlock";
import { useLocation } from "react-router";




const GamePage = () => {
  // const location = useLocation();
  // console.log(location);
  // const sessionNickname = location.state.sessionNickname;
  // const sessionRoomId = location.state.sessionRoomId;
  // const sessionCapacity = location.state.sessionCapacity;
  // const sessionHost = location.state.sessionHost;

  return (
    <OpenViduBlock
      // sessionNickname={sessionNickname}
      // sessionRoomId={sessionRoomId}
      // sessionCapacity={sessionCapacity}
      // sessionHost={sessionHost}
    />
  );
};

export default GamePage;
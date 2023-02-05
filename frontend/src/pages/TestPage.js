
import Openvidu from "components/OpenviduTest/Openvidu";
import { useLocation } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  // const sessionNickname = location.state.sessionNickname;
  // const sessionRoomId = location.state.sessionRoomId;
  // const sessionCapacity = location.state.sessionCapacity;
  // const sessionHost = location.state.sessionHost;

  return (
    <div>
      <h1>OpenviduPage</h1>
      <Openvidu
        // sessionNickname={sessionNickname}
        // sessionRoomId={sessionRoomId}
        // sessionCapacity={sessionCapacity}
        // sessionHost={sessionHost}
      />
    </div>
  );
};

export default TestPage;

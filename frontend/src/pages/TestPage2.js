
import OpenviduTest2 from "components/OpenviduTest/OpenviduTest2";
import { useLocation } from "react-router-dom";

const TestPage2 = () => {
  const location = useLocation();
  // const sessionNickname = location.state.sessionNickname;
  // const sessionRoomId = location.state.sessionRoomId;
  // const sessionCapacity = location.state.sessionCapacity;
  // const sessionHost = location.state.sessionHost;

  return (
    <div>
      <OpenviduTest2
        // sessionNickname={sessionNickname}
        // sessionRoomId={sessionRoomId}
        // sessionCapacity={sessionCapacity}
        // sessionHost={sessionHost}
      />
    </div>
  );
};

export default TestPage2;

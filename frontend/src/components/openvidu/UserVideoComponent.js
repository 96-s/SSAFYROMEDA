import { useState, useEffect } from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";

const UserVideoComponent = ({ streamManager, mainStreamer, status }) => {
  const [userNickname, setUserNickname] = useState("");
  console.log(streamManager);
  const getNicknameTag = (streamManager) => {
    // console.warn("안녕", streamManager.stream);
    const nickname = JSON.parse(
      streamManager.stream.connection.data
    ).clientData;
    // console.warn("안녕닉네임", nickname);
    setUserNickname(nickname);
  };

  useEffect(() => {
    getNicknameTag(streamManager);
  }, []);

  return (
    <div>
      {streamManager !== undefined ? (
        <div className={status}>
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className={status}>{userNickname}</div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

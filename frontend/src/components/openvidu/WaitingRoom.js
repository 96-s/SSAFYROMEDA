import UserVideoComponent from "./UserVideoComponent";
import { useState } from "react";

const WaitingRoom = (
  session,
  handleMainVideoStream,
  switchCamera,
  leaveSession,
  mainStreamManager,
  publisher,
  subscribers
) => {
  return (
    <div>
      <UserVideoComponent
        streamManager={publisher}
        mainStreamer={"publisher"}
        status={"waiting"}
      ></UserVideoComponent>
    </div>
  );
};

export default WaitingRoom;

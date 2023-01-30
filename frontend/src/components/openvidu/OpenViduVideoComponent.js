import React, { useRef, useEffect } from "react";

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (streamManager && !videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      <video autoPlay={true} ref={videoRef} />
    </>
  );
};

export default OpenViduVideoComponent;

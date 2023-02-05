import React, { useContext, useCallback } from "react";

import { Context } from "../../store/audio";

import audioOn from "resources/images/ON.png";
import audioOff from "resources/images/OFF.png";

import styled from "styled-components";

const SoundDiv = styled.div`
  width: 100%;
  height: 10%;
  button.firstBtn:focus {
    border: none;
    outline: none;
  }
`;

const Button = styled.button`
  align-items: center;
  width: 50%;
  height: 70px;
  border: none;
  font-size: 40px;

  background-color: transparent;
  img {
    width: 100%;
  }
  h4{
    color: skyblue;
  }
`;

const Sound = () => {
  const { isPlay, setIsPlay } = useContext(Context);
  console.log("sound.js");
  console.log(isPlay);

  const onClickPlayMusicButton = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay, setIsPlay]);
  return (
    <SoundDiv>
      <Button onClick={onClickPlayMusicButton}>
        {isPlay ? <h4>배경 ON</h4> : <h4>배경 OFF</h4>}
      </Button>
    </SoundDiv>
  );
};
export default Sound;

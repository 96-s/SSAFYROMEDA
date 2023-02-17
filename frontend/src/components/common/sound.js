import React, { useContext, useCallback } from "react";


import { Context } from "./audio.js";

import sdon from "resources/images/soundon_icon.png";
import sdoff from "resources/images/soundoff_icon.png";

import styled from "styled-components";

const SoundDiv = styled.div`
  width: 100%;
  height: 95%;
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
  h4 {
    color: skyblue;
  }
`;
const HeaderRightSoundOn = styled.div`
  .audioImg {
    width: 60px;
    height: 60px;
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
      <HeaderRightSoundOn onClick={onClickPlayMusicButton}>
        {isPlay ? (
          <img src={sdon} alt="Aon" className="audioImg nes-pointer"></img>
        ) : (
          <img src={sdoff} alt="Aof" className="audioImg nes-pointer"></img>
        )}
      </HeaderRightSoundOn>
    </SoundDiv>
  );
};
export default Sound;

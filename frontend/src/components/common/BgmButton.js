import { useState } from "react";
import styled from "styled-components";

import sdon from "resources/images/soundon_icon.png";
import sdoff from "resources/images/soundoff_icon.png";
import { useEffect } from "react";

const BgmButtonImg = styled.img`
  width: 60px;
  height: 60px;
`;

const BgmButton = ({ bgm, volume }) => {
  var audio = {
    id: "music-opening",
    name: "MusicOpening",
    file: new Audio(bgm),
    isPlay: false,
  };

  function playSound() {
    audio.isPlay = true;
    console.log("isplay는?", audio.isPlay);

    audio.file.play();
    audio.file.loop = true;
    audio.file.volume = volume;
  }

  function pauseSound() {
    audio.isPlay = false;
    console.log("isplay는?", audio.isPlay);

    audio.file.pause();
    console.log("음악 멈춰!!");
    audio.file.currentTime = 0;
  }

  const soundButtonHandle = () => {
    audio.isPlay ? pauseSound() : playSound();
  };

  return (
    <div>
      <div onClick={soundButtonHandle}>
        {audio.isPlay ? (
          <BgmButtonImg
            src={sdoff}
            alt="Aoff"
            className="audioImg nes-pointer"
          ></BgmButtonImg>
        ) : (
          <BgmButtonImg
            src={sdon}
            alt="Aon"
            className="audioImg nes-pointer"
          ></BgmButtonImg>
        )}
      </div>
    </div>
  );
};

export default BgmButton;

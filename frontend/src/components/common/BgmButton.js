import { useState } from "react";

import sdon from "resources/images/soundon_icon.png";
import sdoff from "resources/images/soundoff_icon.png";
import { useEffect } from "react";

const BgmButton = ({ bgm }) => {
  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  function pauseSound(soundName) {
    var audio = new Audio(soundName);
    audio.muted();
    audio.currentTime = 0;
  }

  const [isPlay, setIsplay] = useState(false);

  const soundButtonHandle = () => {
    setIsplay(!isPlay);
    isPlay ? pauseSound(bgm) : playSound(bgm);
  };

  return (
    <div>
      <div onClick={soundButtonHandle}>
        {isPlay ? (
          <img src={sdon} alt="Aon" className="audioImg nes-pointer"></img>
        ) : (
          <img src={sdoff} alt="Aof" className="audioImg nes-pointer"></img>
        )}
      </div>
    </div>
  );
};

export default BgmButton;

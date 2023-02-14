import { useState } from "react";

import sdon from "resources/images/soundon_icon.png";
import sdoff from "resources/images/soundoff_icon.png";

const BgmButton = () => {
  const [isPlay, setIsplay] = useState();

  const soundButtonHandle = () => {
    setIsplay(!isPlay);
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

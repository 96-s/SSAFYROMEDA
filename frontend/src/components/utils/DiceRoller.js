import styled from "styled-components";
import Dice from "react-dice-roll";
import { useEffect, useState } from "react";
import Dice1 from "resources/images/Map/dice1.png";
import Dice2 from "resources/images/Map/dice2.png";
import Dice3 from "resources/images/Map/dice3.png";
import DiceSound from "resources/sounds/ssafyromeda_soundpack/14_dice.wav";

const DiceRollerBlock = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const DiceFont = styled.p`
  color: black;
  font-size: 20px;
`;

const DiceRoller = ({
  players,
  isRoll,
  posList,
  playerNum,
  teamNum,
  myTurnNum,
  sessionId,
  diceValue,
  setDiceValue,
  
}) => {
  const onRollHandler = (value) => {
    // const teamPos = posList[teamNum];

    if (value > 3) {
      value = value - 3;
    }
    setDiceValue(value);

  };

  // diceValue 값 들어오면 isRoll false로 변경
  useEffect(() => {
    if (diceValue !== null) {
      console.log(diceValue);
      isRoll = !isRoll;
      console.log(isRoll);
    }
  }, [diceValue]);

  const faces = [Dice1, Dice2, Dice3, Dice1, Dice2, Dice3];

  // 브금
  const soundEffect = () => {
    playSound(DiceSound);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  };

  return (
    <DiceRollerBlock>
      <DiceFont>주사위를 던지세요!</DiceFont>
      <Dice
        size={100}
        disabled={false}
        rollingTime={700}
        onRoll={(value) => {
          onRollHandler(value);
          soundEffect();
        }}
        faces={faces}
      />
    </DiceRollerBlock>
  );
};

export default DiceRoller;

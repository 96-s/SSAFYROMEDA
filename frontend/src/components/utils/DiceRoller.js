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
  setIsRoll,
  posList,
  teamNum,
  sessionId,
  diceValue,
  setDiceValue,
  diceResult,
  setDiceResult,
}) => {
  const onRollHandler = (value) => {
    // const teamPos = posList[teamNum];

    if (value > 3) {
      value = value - 3;
    }
    setDiceResult(value);
    // const tempPosNum = (teamPos + value) % 21
    // console.log(diceValue);
    // emit 데이터 준비
    // let teamNum = null;

    // if (myTurnNum in [0, 1, 2]) {
    //     teamNum = 0
    // } else {
    //     teamNum = 1
    // }
    // nextPosList[teamNum] = tempPosNum;

    // 시간값 이용(줌글)
    // let nowDate = new Date();
    // let rand = Math.random() * 8 // 미니게임 수
    // rand = (rand + nowDate.getSeconds()) * nowDate.getMinutes();
    // const nextMinigameType = (Math.floor(rand) + nowDate.getSeconds()) % 8;

    // console.error(nextMinigameType);

    // let sendData = {};

    // if (nextPosList[0] > 21) {
    // nextPosList[0] = 21
    // sendData = {
    //     session: sessionId,
    //     to: [],
    //     data: JSON.stringify({
    //     nextIsGameDone: true,
    //     nextPosList: nextPosList, // 자리 업데이트
    //     }),
    //     type: 'GAME_STATE_DONE',
    // }
    // } else {
    // // 다음 게임 상태
    // sendData = {
    //     session: sessionId,
    //     to: [],
    //     data: JSON.stringify({
    //     nextPosList: nextPosList,
    //     nextMinigameType: nextMinigameType,
    //     diceValue: diceValue,
    //     }),
    //     type: 'GAME_STATE_CHANGED',
    // }
    // }
    // fetch('https://i8d205.p.ssafy.io/openvidu/api/signal', {
    // method: 'POST',
    // headers: {
    //     Authorization: 'Basic ' + btoa('OPENVIDUAPP:ssafyromeda'),
    //     'Content-type': 'application/json',
    // },
    // body: JSON.stringify(sendData),
    // });
  };

  // diceValue 값 들어오면 isRoll false로 변경
  useEffect(() => {
    if (diceResult !== null) {
      console.log(`diceValue + ${diceResult}`);
      setIsRoll(false);
      console.log(`isRoll + ${isRoll}`);
    }
  }, [diceResult]);

  const faces = [Dice1, Dice2, Dice3, Dice1, Dice2, Dice3];

  // 브금
  const soundEffect = () => {
    playSound(DiceSound);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

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

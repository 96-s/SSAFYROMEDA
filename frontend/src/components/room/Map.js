import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Timer from "components/common/Timer";
// import DiceRoller from 'components/utils/DiceRoller';
import DiceModal from './DiceModal';


import Dice1 from "resources/images/Map/dice1.png";
import Dice2 from "resources/images/Map/dice2.png";
import Dice3 from "resources/images/Map/dice3.png";


import MapIMG from "resources/images/Map/MapIMG.gif"
import Marker1IMG from "resources/images/Map/marker1.png";
import Marker2IMG from "resources/images/Map/marker2.png";

const Page = styled.div`
    display: flex;
    justify-content: center;
`;

const Board = styled.div`
    display: flex;
    justify-content: center;
    margin auto;
    border: 1px solid black;
    aspect-ratio: 1 / 1;
    height: 85vh;
    background: url(${MapIMG}) no-repeat;
    background-size: 100%;
    color: white;
`;

const Marker1 = styled.section`
    animation: moveToRight-17 2s ease;

    img {
        width: 80px;
        position: absolute;
        top: 65px;
        left: 470px;
    }
`;

// @-webkit-keyframes marker1 {
//     0% {
//         left: 100px;
//     }
//     100% {
//         left: 300px;
//     }
// }

const Marker2 = styled.section`
    img {
        width: 80px;
        position: absolute;
        top: 65px;
        left: 470px;
    }
`;

const Timers = styled.section`
    display: flex;
    justify-content: center;
`

const ShowDiceModal = styled.div`
    display: flex;
    width: 15vmin;
    height: 15vmin;

    &.dice-1 {
        @keyframes leaves-1 {
          0% {
              transform: scale(0);
          }
          100% {
              transform: scale(1);
          }
        }
        animation: leaves-1 2.5s ease-in-out;    
        background: url(${Dice1}) no-repeat center;
        background-size: 10vmin 10vmin;
    }
    &.dice-2 {
        @keyframes leaves-2 {
          0% {
              transform: scale(0);
          }
          100% {
              transform: scale(1);
          }
        }
        animation: leaves-1 2.5s ease-in-out;    
        background: url(${Dice2}) no-repeat center;
        background-size: 10vmin 10vmin;
    }
    &.dice-3 {
        @keyframes leaves-1 {
          0% {
              transform: scale(0);
          }
          100% {
              transform: scale(1);
          }
        }
        animation: leaves-1 2.5s ease-in-out;    
        background: url(${Dice3}) no-repeat center;
        background-size: 10vmin 10vmin;
    }
`





const Map = ({
    isRoll,
    sessionIdValue,
    players,
    posList,
    turnNum,
    whatDiceNum,
    myUserNameValue,
    setWhatDiceNum

}) => {
    const [diceValue, setDiceValue] =  useState(null)
    // const playerNum = players.length;
    const playerNum = 6;
    // const myTurnNum = players.indexOf(myUserNameValue);
    const myTurnNum = 1;
    const [showDiceToggle, setShowDiceToggle] = useState(false);

    const openDice = () => {
        setShowDiceToggle(true);
        console.log("뜨나");
    };

    const closeDice = useEffect(() => {
      console.log(diceValue);
      if (diceValue !== null) {
        setTimeout(() => {
          setShowDiceToggle(false)
          setDiceValue(null)
        }, 3000)
        console.log("닫힌다");
        // setShowDiceToggle(false)
        // diceValue(null)
      }
    }, [diceValue])

    // 렌더링될 때마다 주사위 토글 true 됨 --> 고쳐라
    // useEffect(() => {    
    //     if (whatDiceNum===0) {
    //       return
    //     }
    //     // setShowDiceToggle(true);
        
    //     setTimeout(() => {
    //       setShowDiceToggle(false);
    //       setWhatDiceNum(0);
    //     }, 6000);
    //     console.log("꺼진다");
    //   }, [whatDiceNum]);

    // 주사위 굴려지고 닫히면 말 이동
    useEffect(() => {
        if (setShowDiceToggle === false) {

        }
    })

    return (
      <Page>
        <Board>
          <span onClick={openDice}>I</span>
          <DiceModal
            open={showDiceToggle}
            close={closeDice}
            setDiceValue={setDiceValue}
          ></DiceModal>
          <Timers>
            <Timer mm="1" ss="0" />
          </Timers>
          {/* {!isRoll & (myTurnNum === turnNum) ? (
            <DiceRoller
              players={players}
              isRoll={isRoll}
              posList={posList}
              playerNum={playerNum}
              myTurnNum={myTurnNum}
              mySessionIdValue={sessionIdValue}
            ></DiceRoller>
          ) : (
            ""
          )} */}
          {/* {showDiceToggle ? (
            <ShowDiceModal className={`dice-${whatDiceNum}`}></ShowDiceModal>
          ) : (
            ""
          )} */}
          <Marker1>
            <img src={Marker1IMG} alt="marker1"></img>
          </Marker1>
          <Marker2>
            <img src={Marker2IMG} alt="marker2"></img>
          </Marker2>
        </Board>
      </Page>
    );
};

export default Map;
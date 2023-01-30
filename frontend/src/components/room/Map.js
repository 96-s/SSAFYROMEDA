import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Timer from "components/common/Timer";
import DiceRoller from 'components/utils/DiceRoller';
import Dice1 from "resources/images/Map/dice1.png";
import Dice2 from "resources/images/Map/dice2.png";
import Dice3 from "resources/images/Map/dice3.png";


import MapIMG from "resources/images/Map/MapIMG.gif";
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
    img {
        width: 50px;
        position: relative;
        top: 20px;
        left: -275px;
    }
`;
const Marker2 = styled.section`
    img {
        width: 50px;
        position: relative;
        top: 20px;
        left: -285px;
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
    // const playerNum = players.length;
    const playerNum = 6;
    // const myTurnNum = players.indexOf(myUserNameValue);
    const myTurnNum = 1;
    const [showDiceToggle, setShowDiceToggle] = useState(false);

    useEffect(() => {    
        if (whatDiceNum===0) {
          return
        }
        setShowDiceToggle(true);
        setTimeout(() => {
          setShowDiceToggle(false);
          setWhatDiceNum(0);
        }, 4500);
      }, [whatDiceNum]);

    return (
      <Page>
        <Board>
          <Timers>
            <Timer mm="1" ss="0" />
          </Timers>
          {!isRoll & (myTurnNum === turnNum) ? (
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
          )}
          {showDiceToggle ? (
            <ShowDiceModal className={`dice-${whatDiceNum}`}>
            </ShowDiceModal>
          ) : (
            ""
          )}
          {/* <Marker1 className={`pos${posList[myTurnNum]}`}>
            <img src={Marker1IMG} alt="marker1"></img>
          </Marker1>
          <Marker2>
            <img src={Marker2IMG} alt="marker2"></img>
          </Marker2> */}
        </Board>
      </Page>
    );
};

export default Map;
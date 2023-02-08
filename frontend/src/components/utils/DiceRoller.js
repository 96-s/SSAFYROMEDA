import styled from 'styled-components';
import Dice from 'react-dice-roll';
import { useEffect, useState } from 'react';
import Dice1 from "resources/images/Map/dice1.png";
import Dice2 from "resources/images/Map/dice2.png";
import Dice3 from "resources/images/Map/dice3.png";

const DiceRollerBlock = styled.div`

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
    setDiceValue
}) => {

    const onRollHandler = (value) => {

        const teamPos = posList[teamNum];

        if (value > 3) {
            value = value - 3;
        }
        setDiceValue(value);
        const tempPosNum = (teamPos + value) % 21

        // emit 데이터 준비
        let nextPosList = [...posList];
        // let teamNum = null;

        // if (myTurnNum in [0, 1, 2]) {
        //     teamNum = 0
        // } else {
        //     teamNum = 1 
        // }
        nextPosList[teamNum] = tempPosNum;

        // 시간값 이용(줌글)
        let nowDate = new Date();
        let rand = Math.random() * 8 // 미니게임 수
        rand = (rand + nowDate.getSeconds()) * nowDate.getMinutes();
        const nextMinigameType = (Math.floor(rand) + nowDate.getSeconds()) % 8;
        
        console.error(nextMinigameType);
        
        let sendData = {};
        
        if (nextPosList[0] > 21) {
        nextPosList[0] = 21
        sendData = {
            session: sessionId,
            to: [],
            data: JSON.stringify({
            nextIsGameDone: true,
            nextPosList: nextPosList, // 자리 업데이트
            }),
            type: 'GAME_STATE_DONE',
        }
        } else {
        // 다음 게임 상태
        sendData = {
            session: sessionId,
            to: [],
            data: JSON.stringify({
            nextPosList: nextPosList,
            nextMinigameType: nextMinigameType,
            diceValue: diceValue,
            }),
            type: 'GAME_STATE_CHANGED',
        }
        }
        fetch('https://i8d205.p.ssafy.io:4443/openvidu/api/signal', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:ssafyromeda'),
            'Content-type': 'application/json',
        },
        body: JSON.stringify(sendData),
        });
    }

    // diceValue 값 들어오면 isRoll false로 변경
    useEffect(() => {
        if (diceValue !== null) {
            console.log(diceValue);
            isRoll = false;
            console.log(isRoll);
        }
    }, [diceValue])


    //     if (myPos + value > 20) {
    //         nextPosList[myTurnNum] = 20;
    //         sendData = {
    //             session: sessionIdValue,
    //             to: [],
    //             data: JSON.stringify({
    //                 nextIsGameDone: true,
    //                 nextPosList: nextPosList, 
    //             }),
    //             type: 'GAME_STATE_DONE',
    //         }
    //     } else {
    //         sendData = {
    //             session: sessionIdValue,
    //             to: [],
    //             data: JSON.stringify({
    //                 nextPosList: nextPosList,
    //                 isRoll: !isRoll,
    //                 nextMinigame: nextMinigame,
    //                 nextWhatDiceNum: value,
    //             }),
    //             type: 'GAME_STATE_CHANGED',
    //         }
    //     }
    //     fetch("https://i8d205.p.ssafy.io:4443/openvidu/api/signal", {
    //       method: "POST",
    //       headers: {
    //         Authorization: "Basic " + btoa("OPENVIDUAPP:d205ssafy81"),
    //         "Content-type": "application/json",
    //       },
    //       body: JSON.stringify(sendData),
    //     });

    const faces = [Dice1, Dice2, Dice3, Dice1, Dice2, Dice3];

    return (
        <DiceRollerBlock>
            <Dice
                size={100}
                disabled={false}
                rollingTime={700}
                onRoll={(value) => {
                    onRollHandler(value);
                }}
                faces={faces}
            />
        </DiceRollerBlock>
    )
}

export default DiceRoller;
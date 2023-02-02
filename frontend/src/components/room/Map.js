import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Timer from "components/common/Timer";
// import DiceRoller from 'components/utils/DiceRoller';
import DiceModal from './DiceModal';


// import Dice1 from "resources/images/Map/dice1.png";
// import Dice2 from "resources/images/Map/dice2.png";
// import Dice3 from "resources/images/Map/dice3.png";


import MapIMG from "resources/images/Map/MapIMG.gif"
import Marker1IMG from "resources/images/Map/marker1.png";
import Marker2IMG from "resources/images/Map/marker2.png";

const Page = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
`;

const Board = styled.div` 
    position: relative;
    justify-content: center;
    margin auto;
    border: 1px solid black;
    aspect-ratio: 1 / 1;
    height: 85vh;
    background: url(${MapIMG}) no-repeat;
    background-size: 100%;
    color: white;
`;

const Marker1 = styled.div`
  display: flex;
  width: 11vmin;
  height: 11vmin;
  position: absolute;
  z-index: 5;

  // &.pos0 {
  //   top: 0.8%;
  //   left: 4%;
  //   @keyframes moveToRight-0 {
  //     0% {
  //       transform: translate(0px, 0px);
  //     }
  //     100% {
  //       transform: translate(3.5%, 110%);
  //     }
  //   }
  //   animation: moveToRight-0 2s ease;
  // }
    
  &.pos1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToRight-1 {
      0% {
        transform: translate(-1.9vw, -11.1vh);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToRight-1 2s ease;
  }

  &.pos2 {
    top: 17.3%;
    left: 21.3%;
    @keyframes moveToRight-2 {
      0% {
        transform: translate(-30%, -3%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-2 2s ease;
  }

  // &.pos3 {
  //   top: 21.5vh;
  //   left: 45vw;
  //   @keyframes moveToRight-3 {
  //     0% {
  //       transform: translate(0px, 0px);
  //     }
  //     100% {
  //       transform: translateX(0vw);
  //     }
  //   }
  //   animation: moveToRight-3 2s ease;
  // }

  // &.pos4 {
  //   top: 16vh;
  //   left: 50.55vw;
  //   @keyframes moveToRight-4 {
  //     0% {
  //       transform: translateX(-10vw);
  //     }
  //     100% {
  //       transform: translateX(0vw);
  //     }
  //   }
  //   animation: moveToRight-4 2s ease;
  // }

  // &.pos5 {
  //   top: 15.2vh;
  //   left: 55.9vw;
  //   @keyframes moveToRight-5 {
  //     0% {
  //       transform: translateX(-10vw);
  //     }
  //     100% {
  //       transform: translateX(0vw);
  //     }
  //   }
  //   animation: moveToRight-5 2s ease;
  // }

  // &.pos6 {
  //   top: 16.5vh;
  //   left: 67.4vw;
  //   @keyframes moveToRight-6 {
  //     0% {
  //       transform: translateX(-10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-6 2s ease;
  // }

  // &.pos7 {
  //   top: 27vh;
  //   left: 65.25vw;
  //   @keyframes moveToRight-7 {
  //     0% {
  //       transform: translate(-4vw, 10vh);
  //     }
  //     100% {
  //       transform: translate(0, 0);
  //     }
  //   }
  //   animation: moveToRight-7 2s ease;
  // }

  // &.pos8 {
  //   top: 40.5vh;
  //   left: 64.4vw;
  //   @keyframes moveToRight-8 {
  //     0% {
  //       transform: translate(-4vw, 10vh);
  //     }
  //     100% {
  //       transform: translate(0, 0);
  //     }
  //   }
  //   animation: moveToRight-8 2s ease;
  // }

  // &.pos9 {
  //   top: 41.8vh;
  //   left: 58.7vw;
  //   @keyframes moveToRight-9 {
  //     0% {
  //       transform: translate(-4vw, 10vh);
  //     }
  //     100% {
  //       transform: translate(0, 0);
  //     }
  //   }
  //   animation: moveToRight-9 2s ease;
  // }

  // &.pos10 {
  //   top: 38vh;
  //   left: 53.4vw;
  //   @keyframes moveToRight-10 {
  //     0% {
  //       transform: translate(4vw, 10vh);
  //     }
  //     100% {
  //       transform: translate(0, 0);
  //     }
  //   }
  //   animation: moveToRight-10 2s ease;
  // }

  // &.pos11 {
  //   top: 35.7vh;
  //   left: 48.5vw;
  //   @keyframes moveToRight-11 {
  //     0% {
  //       transform: translateX(10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-11 2s ease;
  // }

  // &.pos12 {
  //   top: 38.5vh;
  //   left: 43.2vw;
  //   @keyframes moveToRight-12 {
  //     0% {
  //       transform: translateX(10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-12 2s ease;
  // }

  // &.pos13 {
  //   top: 40vh;
  //   left: 36.8vw;
  //   @keyframes moveToRight-13 {
  //     0% {
  //       transform: translateX(10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-13 2s ease;
  // }

  // &.pos14 {
  //   top: 52.5vh;
  //   left: 32.7vw;
  //   @keyframes moveToRight-14 {
  //     0% {
  //       transform: translateX(10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-14 2s ease;
  // }

  // &.pos15 {
  //   top: 64.3vh;
  //   left: 34.05vw;
  //   @keyframes moveToRight-15 {
  //     0% {
  //       transform: translateX(10vw);
  //     }
  //     100% {
  //       transform: translateX(0);
  //     }
  //   }
  //   animation: moveToRight-15 2s ease;
  // }

  // &.pos16 {
  //   top: 67.8vh;
  //   left: 40.15vw;
  //   @keyframes moveToRight-16 {
  //     0% {
  //       transform: translate(5vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-16 2s ease;
  // }

  // &.pos17 {
  //   top: 67.1vh;
  //   left: 46vw;
  //   @keyframes moveToRight-17 {
  //     0% {
  //       transform: translate(5vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-17 2s ease;
  // }

  // &.pos18 {
  //   top: 62.8vh;
  //   left: 53.3vw;
  //   @keyframes moveToRight-18 {
  //     0% {
  //       transform: translate(-5vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-18 2s ease;
  // }

  // &.pos19 {
  //   top: 60.5vh;
  //   left: 59.7vw;
  //   @keyframes moveToRight-19 {
  //     0% {
  //       transform: translate(3vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-19 2s ease;
  // }
  // &.pos19 {
  //   top: 60.5vh;
  //   left: 59.7vw;
  //   @keyframes moveToRight-19 {
  //     0% {
  //       transform: translate(3vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-19 2s ease;
  // }
  // &.pos20 {
  //   top: 64.4vh;
  //   left: 64.6vw;
  //   @keyframes moveToRight-19 {
  //     0% {
  //       transform: translate(3vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-19 2s ease;
  // }
  // &.pos21 {
  //   top: 78.5vh;
  //   left: 62.3vw;
  //   @keyframes moveToRight-19 {
  //     0% {
  //       transform: translate(3vw, -5vh);
  //     }
  //     100% {
  //       transform: translate(0);
  //     }
  //   }
  //   animation: moveToRight-19 2s ease;
  // }
  // &.testPos {
  //   margin-left: 2vw;
  // }
`;


// const Marker2 = styled.section`
//     img {
//         width: 80px;
//         position: absolute;
//         // top: 65px;
//         // left: 470px;
//     }
// `;

const Timers = styled.div`
    display: flex;
    positon: absolute;
    justify-content: center;
`

// const ShowDiceModal = styled.div`
//     display: flex;
//     width: 15vmin;
//     height: 15vmin;

//     &.dice-1 {
//         @keyframes leaves-1 {
//           0% {
//               transform: scale(0);
//           }
//           100% {
//               transform: scale(1);
//           }
//         }
//         animation: leaves-1 2.5s ease-in-out;    
//         background: url(${Dice1}) no-repeat center;
//         background-size: 10vmin 10vmin;
//     }
//     &.dice-2 {
//         @keyframes leaves-2 {
//           0% {
//               transform: scale(0);
//           }
//           100% {
//               transform: scale(1);
//           }
//         }
//         animation: leaves-1 2.5s ease-in-out;    
//         background: url(${Dice2}) no-repeat center;
//         background-size: 10vmin 10vmin;
//     }
//     &.dice-3 {
//         @keyframes leaves-1 {
//           0% {
//               transform: scale(0);
//           }
//           100% {
//               transform: scale(1);
//           }
//         }
//         animation: leaves-1 2.5s ease-in-out;    
//         background: url(${Dice3}) no-repeat center;
//         background-size: 10vmin 10vmin;
//     }
// `





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
    const [showDiceToggle, setShowDiceToggle] = useState(false);

    const openDice = () => {
        setShowDiceToggle(true);
        console.log("뜨나");
    };

    const closeDice = useEffect(() => {
      // console.log(diceValue);
      if (diceValue !== null) {
        setTimeout(() => {
          setShowDiceToggle(false)
          // setDiceValue(null)
        }, 3000)
        console.log("닫힌다");
      }
    }, [diceValue])
    // console.log(diceValue);

    // const moveMarker = useEffect(() => {
    //   // myPos + diceValue
    // })

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
    // useEffect(() => {
    //     if (setShowDiceToggle === false) {

    //     }
    // })

  

    // useEffect (() => {
    //   const marker1 = document.getElementById("marker1");

    //   marker1.animate([
    //     { transform: 'translate(-10%, -100%)' },
    //     { transform: 'translate(0%, 0%)'}
    //   ], {
    //     duration: 1000,
    //     iterations: 1
    //   });
    // });

    useEffect(() => {
      const marker1 = document.getElementById("marker1");
      let nowPosTop = marker1.offsetTop;
      let nowPosLeft = marker1.offsetTop;

      console.log(nowPosTop);

      const nextPosTop = nowPosTop + 10
      const nextPosLeft = nowPosLeft + 50

      nowPosTop += 50

      console.log(nowPosTop);

    })
    

    return (
      <Page>
        <Board>
          {/* <span onClick={openDice}>I</span>
          <DiceModal
            open={showDiceToggle}
            close={closeDice}
            setDiceValue={setDiceValue}
          ></DiceModal> */}
          <Timers>
            {/* <Timer mm="1" ss="0" /> */}
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
          <Marker1 className={`pos${1}`}>
            <img src={Marker1IMG} alt="marker1" id="marker1"></img>
          </Marker1>
          {/* <Marker2>
            <img src={Marker2IMG} alt="marker2"></img>
          </Marker2> */}
        </Board>
      </Page>
    );
    
};

export default Map;
import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Timer from "components/common/Timer";
// import DiceRoller from 'components/utils/DiceRoller';
import DiceModal from './DiceModal';
import ChanceModal from './ChanceModal';


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

  &.pos0 {
    top: 0.8%;
    left: 4%;
    // @keyframes moveToRight-0 {
    //   0% {
    //     transform: translate(0px, 0px);
    //   }
    //   100% {
    //     transform: translate(3.5%, 110%);
    //   }
    // }
    // animation: moveToRight-0 2s ease;
  }
    
  &.pos1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToRight-1 {
      0% {
        transform: translate(-30%, -100%);
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
        transform: translate(-100%, -30%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-2 2s ease;
  }

  &.pos3 {
    top: 16%;
    left: 37.5%;
    @keyframes moveToRight-3 {
      0% {
        transform: translate(-125%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-3 2s ease;
  }

  &.pos4 {
    top: 9.7%;
    left: 51.1%;
    @keyframes moveToRight-4 {
      0% {
        transform: translate(-105%, 45%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-4 2s ease;
  }

  &.pos5 {
    top: 8.5%;
    left: 64%;
    @keyframes moveToRight-5 {
      0% {
        transform: translate(-102%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-5 2s ease;
  }

  &.pos6 {
    top: 9.9%;
    left: 77.1%;
    @keyframes moveToRight-6 {
      0% {
        transform: translate(-102%, -10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-6 2s ease;
  }

  &.pos7 {
    top: 22.3%;
    left: 86.5%;
    @keyframes moveToRight-7 {
      0% {
        transform: translate(-73%, -95%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-7 2s ease;
  }

  &.pos8 {
    top: 38.3%;
    left: 84.5%;
    @keyframes moveToRight-8 {
      0% {
        transform: translate(15%, -125%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-8 2s ease;
  }

  &.pos9 {
    top: 40.5%;
    left: 70.8%;
    @keyframes moveToRight-9 {
      0% {
        transform: translate(105%, -15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-9 2s ease;
  }

  &.pos10 {
    top: 35.3%;
    left: 57.8%;
    @keyframes moveToRight-10 {
      0% {
        transform: translate(103%, 38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-10 2s ease;
  }

  &.pos11 {
    top: 33%;
    left: 46%;
    @keyframes moveToRight-11 {
      0% {
        transform: translate(95%, 18%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-11 2s ease;
  }

  &.pos12 {
    top: 36%;
    left: 33.5%;
    @keyframes moveToRight-12 {
      0% {
        transform: translate(98%, -20%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-12 2s ease;
  }

  &.pos13 {
    top: 37.8%;
    left: 18.3%;
    @keyframes moveToRight-13 {
      0% {
        transform: translate(118%, -15%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-13 2s ease;
  }

  &.pos14 {
    top: 53%;
    left: 8.3%;
    @keyframes moveToRight-14 {
      0% {
        transform: translate(75%, -120%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-14 2s ease;
  }

  &.pos15 {
    top: 66.5%;
    left: 11.5%;
    @keyframes moveToRight-15 {
      0% {
        transform: translate(-25%, -108%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-15 2s ease;
  }

  &.pos16 {
    top: 70.8%;
    left: 26%;
    @keyframes moveToRight-16 {
      0% {
        transform: translate(-113%, -32%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-16 2s ease;
  }

  &.pos17 {
    top: 69.8%;
    left: 40.3%;
    @keyframes moveToRight-17 {
      0% {
        transform: translate(-113%, 10%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-17 2s ease;
  }

  &.pos18 {
    top: 64.8%;
    left: 57.8%;
    @keyframes moveToRight-18 {
      0% {
        transform: translate(-138%, 40%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-18 2s ease;
  }

  &.pos19 {
    top: 62%;
    left: 73%;
    @keyframes moveToRight-19 {
      0% {
        transform: translate(-120%, 23%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-19 2s ease;
  }
  &.pos20 {
    top: 66.8%;
    left: 84.8%;
    @keyframes moveToRight-20 {
      0% {
        transform: translate(-93%, -38%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-20 2s ease;
  }
  &.pos21 {
    top: 83.5%;
    left: 79.2%;
    @keyframes moveToRight-21 {
      0% {
        transform: translate(44%, -130%);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-21 2s ease;
  }
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
    const [openChanceToggle, setOpenChanceToggle] = useState(false);

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

    const openChance = () => {
      setOpenChanceToggle(true);
    };

    const closeChance = () => {
      setOpenChanceToggle(false);
    };

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
    
    let positionList = [];

    for (let i = 0; i < 22; i++) {
      positionList.push(i)
    }
    console.log(positionList);

    const [nowPos, setNowPos] = useState(0);

    var index = 0;
    useEffect (() => {
      setInterval(() => {
        setNowPos(positionList[index++]);
        if (index === positionList.length)
          index = 0
      }, 2000)
    }, nowPos);

    return (
      <Page>
        <Board>
          <span onClick={openChance}>I</span>
          <ChanceModal
            open={openChanceToggle}
            close={closeChance}/>
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
          <Marker1 className={`pos${nowPos}`}>
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
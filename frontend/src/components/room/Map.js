import React, { useState, useEffect } from 'react';
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
        top: 38.5vh;
        left: 43.2vw;
    }
    &.pos0 {
      top: 8.5vh;
      left: 31vw;
      @keyframes moveToRight-0 {
        0% {
          transform: translateX(-10vw);
        }
        100% {
          transform: translateX(0vw);
        }
      }
      animation: moveToRight-0 2s ease;
    }
    
  &.pos1 {
    top: 19.5vh;
    left: 32.9vw;
    @keyframes moveToRight-1 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-1 2s ease;
  }

  &.pos2 {
    top: 22.5vh;
    left: 38.2vw;
    @keyframes moveToRight-2 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-2 2s ease;
  }

  &.pos3 {
    top: 21.5vh;
    left: 45vw;
    @keyframes moveToRight-3 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-3 2s ease;
  }

  &.pos4 {
    top: 16vh;
    left: 50.55vw;
    @keyframes moveToRight-4 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-4 2s ease;
  }

  &.pos5 {
    top: 15.2vh;
    left: 55.9vw;
    @keyframes moveToRight-5 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0vw);
      }
    }
    animation: moveToRight-5 2s ease;
  }

  &.pos6 {
    top: 16.5vh;
    left: 67.4vw;
    @keyframes moveToRight-6 {
      0% {
        transform: translateX(-10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-6 2s ease;
  }

  &.pos7 {
    top: 27vh;
    left: 65.25vw;
    @keyframes moveToRight-7 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-7 2s ease;
  }

  &.pos8 {
    top: 40.5vh;
    left: 64.4vw;
    @keyframes moveToRight-8 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-8 2s ease;
  }

  &.pos9 {
    top: 41.8vh;
    left: 58.7vw;
    @keyframes moveToRight-9 {
      0% {
        transform: translate(-4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-9 2s ease;
  }

  &.pos10 {
    top: 38vh;
    left: 53.4vw;
    @keyframes moveToRight-10 {
      0% {
        transform: translate(4vw, 10vh);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight-10 2s ease;
  }

  &.pos11 {
    top: 35.7vh;
    left: 48.5vw;
    @keyframes moveToRight-11 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-11 2s ease;
  }

  &.pos12 {
    top: 38.5vh;
    left: 43.2vw;
    @keyframes moveToRight-12 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-12 2s ease;
  }

  &.pos13 {
    top: 2.5vh;
    left: 48vw;
    @keyframes moveToRight-13 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-13 2s ease;
  }

  &.pos14 {
    top: 3vh;
    left: 35.5vw;
    @keyframes moveToRight-14 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-14 2s ease;
  }

  &.pos15 {
    top: 3vh;
    left: 22vw;
    @keyframes moveToRight-15 {
      0% {
        transform: translateX(10vw);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight-15 2s ease;
  }

  &.pos16 {
    top: 16vh;
    left: 17vw;
    @keyframes moveToRight-16 {
      0% {
        transform: translate(5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-16 2s ease;
  }

  &.pos17 {
    top: 30vh;
    left: 13vw;
    @keyframes moveToRight-17 {
      0% {
        transform: translate(5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-17 2s ease;
  }

  &.pos18 {
    top: 40vh;
    left: 16vw;
    @keyframes moveToRight-18 {
      0% {
        transform: translate(-5vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-18 2s ease;
  }

  &.pos19 {
    top: 50vh;
    left: 14vw;
    @keyframes moveToRight-19 {
      0% {
        transform: translate(3vw, -5vh);
      }
      100% {
        transform: translate(0);
      }
    }
    animation: moveToRight-19 2s ease;
  }
  &.testPos {
    margin-left: 2vw;
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
        // top: 65px;
        // left: 470px;
    }
`;

const Timers = styled.section`
    display: flex;
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
      console.log(diceValue);
      if (diceValue !== null) {
        setTimeout(() => {
          setShowDiceToggle(false)
          // setDiceValue(null)
        }, 3000)
        console.log("닫힌다");
      }
    }, [diceValue])
    console.log(diceValue);

    const moveMarker = useEffect(() => {
      // myPos + diceValue
    })

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
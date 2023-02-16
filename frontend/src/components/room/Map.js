import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Timer from "components/common/Timer";
// import DiceRoller from 'components/utils/DiceRoller';
import DiceModal from "./DiceModal";
import ChanceModal from "./ChanceModal";
// import Quiz from "./quiz";

import Dice1 from "resources/images/Map/dice1.png";
// import Dice2 from "resources/images/Map/dice2.png";
// import Dice3 from "resources/images/Map/dice3.png";

import MapIMG from "resources/images/Map/MapIMG.gif";
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
  margin: auto;
  border: 4px solid white;
  border-style: dotted;
  aspect-ratio: 1 / 1;
  height: 85vh;
  background: url(${MapIMG}) no-repeat;
  background-size: 100%;
  color: white;
`;

const MyTeamDiv = styled.div`
  text-align: center;
  color: gray;
`;

const MyTeamMarkerDiv = styled.img`
  width: 40px;
  height: 40px;
`;

const WhoDiceDiv = styled.div`
  margin-top: -10px;
  margin-left: 35px;
`;

const DiceIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Marker1 = styled.div`
  display: flex;
  width: 11vmin;
  height: 11vmin;
  position: absolute;
  z-index: 5;

  // 정방향
  &.pos0 {
    top: 0.8%;
    left: 4%;
  }

  &.pos1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToRight1 {
      0% {
        transform: translate(-30%, -100%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToRight1 2s ease;
  }

  &.pos2 {
    top: 17.3%;
    left: 21.3%;
    @keyframes moveToRight2 {
      0% {
        transform: translate(-100%, -30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToRight2 2s ease;
  }

  &.pos3 {
    top: 16%;
    left: 37.5%;
    @keyframes moveToRight3 {
      0% {
        transform: translate(-125%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight3 2s ease;
  }

  &.pos4 {
    top: 9.7%;
    left: 51.1%;
    @keyframes moveToRight4 {
      0% {
        transform: translate(-105%, 45%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight4 2s ease;
  }

  &.pos5 {
    top: 8.5%;
    left: 64%;
    @keyframes moveToRight5 {
      0% {
        transform: translate(-102%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight5 2s ease;
  }

  &.pos6 {
    top: 9.9%;
    left: 77.1%;
    @keyframes moveToRight6 {
      0% {
        transform: translate(-102%, -10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight6 2s ease;
  }

  &.pos7 {
    top: 22.3%;
    left: 86.5%;
    @keyframes moveToRight7 {
      0% {
        transform: translate(-73%, -95%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight7 2s ease;
  }

  &.pos8 {
    top: 38.3%;
    left: 84.5%;
    @keyframes moveToRight8 {
      0% {
        transform: translate(15%, -125%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight8 2s ease;
  }

  &.pos9 {
    top: 40.5%;
    left: 70.8%;
    @keyframes moveToRight9 {
      0% {
        transform: translate(105%, -15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight9 2s ease;
  }

  &.pos10 {
    top: 35.3%;
    left: 57.8%;
    @keyframes moveToRight10 {
      0% {
        transform: translate(103%, 38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight10 2s ease;
  }

  &.pos11 {
    top: 33%;
    left: 46%;
    @keyframes moveToRight11 {
      0% {
        transform: translate(95%, 18%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight11 2s ease;
  }

  &.pos12 {
    top: 36%;
    left: 33.5%;
    @keyframes moveToRight12 {
      0% {
        transform: translate(98%, -20%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight12 2s ease;
  }

  &.pos13 {
    top: 37.8%;
    left: 18.3%;
    @keyframes moveToRight13 {
      0% {
        transform: translate(118%, -15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight13 2s ease;
  }

  &.pos14 {
    top: 53%;
    left: 8.3%;
    @keyframes moveToRight14 {
      0% {
        transform: translate(75%, -120%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight14 2s ease;
  }

  &.pos15 {
    top: 66.5%;
    left: 11.5%;
    @keyframes moveToRight15 {
      0% {
        transform: translate(-25%, -108%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight15 2s ease;
  }

  &.pos16 {
    top: 70.8%;
    left: 26%;
    @keyframes moveToRight16 {
      0% {
        transform: translate(-113%, -32%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight16 2s ease;
  }

  &.pos17 {
    top: 69.8%;
    left: 40.3%;
    @keyframes moveToRight17 {
      0% {
        transform: translate(-113%, 10%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight17 2s ease;
  }

  &.pos18 {
    top: 64.8%;
    left: 57.8%;
    @keyframes moveToRight18 {
      0% {
        transform: translate(-138%, 40%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight18 2s ease;
  }

  &.pos19 {
    top: 62%;
    left: 73%;
    @keyframes moveToRight19 {
      0% {
        transform: translate(-120%, 23%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight19 2s ease;
  }
  &.pos20 {
    top: 66.8%;
    left: 84.8%;
    @keyframes moveToRight20 {
      0% {
        transform: translate(-93%, -38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight20 2s ease;
  }
  &.pos21 {
    top: 83.5%;
    left: 79.2%;
    @keyframes moveToRight21 {
      0% {
        transform: translate(44%, -130%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight21 2s ease;
  }

  // 역방향
  &.pos-0 {
    top: 0.8%;
    left: 4%;
    @keyframes moveToLeft-0 {
      0% {
        transform: translate(100%, 30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-0 2s ease;
  }

  &.pos-1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToLeft-1 {
      0% {
        transform: translate(100%, 30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-1 2s ease;
  }

  &.pos-2 {
    top: 17.3%;
    left: 21.3%;
    @keyframes moveToLeft-2 {
      0% {
        transform: translate(125%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-2 2s ease;
  }

  &.pos-3 {
    top: 16%;
    left: 37.5%;
    @keyframes moveToLeft-3 {
      0% {
        transform: translate(105%, -45%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-3 2s ease;
  }

  &.pos-4 {
    top: 9.7%;
    left: 51.1%;
    @keyframes moveToLeft-4 {
      0% {
        transform: translate(102%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-4 2s ease;
  }

  &.pos-5 {
    top: 8.5%;
    left: 64%;
    @keyframes moveToLeft-5 {
      0% {
        transform: translate(102%, 10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-5 2s ease;
  }

  &.pos-6 {
    top: 9.9%;
    left: 77.1%;
    @keyframes moveToLeft-6 {
      0% {
        transform: translate(73%, 95%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-6 2s ease;
  }

  &.pos-7 {
    top: 22.3%;
    left: 86.5%;
    @keyframes moveToLeft-7 {
      0% {
        transform: translate(-15%, 125%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-7 2s ease;
  }

  &.pos-8 {
    top: 38.3%;
    left: 84.5%;
    @keyframes moveToLeft-8 {
      0% {
        transform: translate(-105%, 15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-8 2s ease;
  }

  &.pos-9 {
    top: 40.5%;
    left: 70.8%;
    @keyframes moveToLeft-9 {
      0% {
        transform: translate(-103%, -38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-9 2s ease;
  }

  &.pos-10 {
    top: 35.3%;
    left: 57.8%;
    @keyframes moveToLeft-10 {
      0% {
        transform: translate(-95%, -18%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-10 2s ease;
  }

  &.pos-11 {
    top: 33%;
    left: 46%;
    @keyframes moveToLeft-11 {
      0% {
        transform: translate(-98%, 20%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-11 2s ease;
  }

  &.pos-12 {
    top: 36%;
    left: 33.5%;
    @keyframes moveToLeft-12 {
      0% {
        transform: translate(-118%, 15%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-12 2s ease;
  }

  &.pos-13 {
    top: 37.8%;
    left: 18.3%;
    @keyframes moveToLeft-13 {
      0% {
        transform: translate(-75%, 120%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-13 2s ease;
  }

  &.pos-14 {
    top: 53%;
    left: 8.3%;
    @keyframes moveToLeft-14 {
      0% {
        transform: translate(25%, 108%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-14 2s ease;
  }

  &.pos-15 {
    top: 66.5%;
    left: 11.5%;
    @keyframes moveToLeft-15 {
      0% {
        transform: translate(113%, 32%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-15 2s ease;
  }

  &.pos-16 {
    top: 70.8%;
    left: 26%;
    @keyframes moveToLeft-16 {
      0% {
        transform: translate(113%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-16 2s ease;
  }

  &.pos-17 {
    top: 69.8%;
    left: 40.3%;
    @keyframes moveToLeft-17 {
      0% {
        transform: translate(138%, -40%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-17 2s ease;
  }

  &.pos-18 {
    top: 64.8%;
    left: 57.8%;
    @keyframes moveToLeft-18 {
      0% {
        transform: translate(120%, -23%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-18 2s ease;
  }

  &.pos-19 {
    top: 62%;
    left: 73%;
    @keyframes moveToLeft-19 {
      0% {
        transform: translate(93%, 38%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-19 2s ease;
  }
  &.pos-20 {
    top: 66.8%;
    left: 84.8%;
    @keyframes moveToLeft-20 {
      0% {
        transform: translate(-44%, 130%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-20 2s ease;
  }
  &.pos-21 {
    top: 83.5%;
    left: 79.2%;
  }
`;

const Marker2 = styled.div`
  display: flex;
  width: 11vmin;
  height: 11vmin;
  position: absolute;
  z-index: 5;

  // 정방향
  &.pos0 {
    top: 0.8%;
    left: 4%;
  }

  &.pos1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToRight1 {
      0% {
        transform: translate(-30%, -100%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToRight1 2s ease;
  }

  &.pos2 {
    top: 17.3%;
    left: 21.3%;
    @keyframes moveToRight2 {
      0% {
        transform: translate(-100%, -30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToRight2 2s ease;
  }

  &.pos3 {
    top: 16%;
    left: 37.5%;
    @keyframes moveToRight3 {
      0% {
        transform: translate(-125%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight3 2s ease;
  }

  &.pos4 {
    top: 9.7%;
    left: 51.1%;
    @keyframes moveToRight4 {
      0% {
        transform: translate(-105%, 45%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight4 2s ease;
  }

  &.pos5 {
    top: 8.5%;
    left: 64%;
    @keyframes moveToRight5 {
      0% {
        transform: translate(-102%, 10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight5 2s ease;
  }

  &.pos6 {
    top: 9.9%;
    left: 77.1%;
    @keyframes moveToRight6 {
      0% {
        transform: translate(-102%, -10%);
      }
      100% {
        transform: translateX(0);
      }
    }
    animation: moveToRight6 2s ease;
  }

  &.pos7 {
    top: 22.3%;
    left: 86.5%;
    @keyframes moveToRight7 {
      0% {
        transform: translate(-73%, -95%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight7 2s ease;
  }

  &.pos8 {
    top: 38.3%;
    left: 84.5%;
    @keyframes moveToRight8 {
      0% {
        transform: translate(15%, -125%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight8 2s ease;
  }

  &.pos9 {
    top: 40.5%;
    left: 70.8%;
    @keyframes moveToRight9 {
      0% {
        transform: translate(105%, -15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight9 2s ease;
  }

  &.pos10 {
    top: 35.3%;
    left: 57.8%;
    @keyframes moveToRight10 {
      0% {
        transform: translate(103%, 38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight10 2s ease;
  }

  &.pos11 {
    top: 33%;
    left: 46%;
    @keyframes moveToRight11 {
      0% {
        transform: translate(95%, 18%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight11 2s ease;
  }

  &.pos12 {
    top: 36%;
    left: 33.5%;
    @keyframes moveToRight12 {
      0% {
        transform: translate(98%, -20%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight12 2s ease;
  }

  &.pos13 {
    top: 37.8%;
    left: 18.3%;
    @keyframes moveToRight13 {
      0% {
        transform: translate(118%, -15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight13 2s ease;
  }

  &.pos14 {
    top: 53%;
    left: 8.3%;
    @keyframes moveToRight14 {
      0% {
        transform: translate(75%, -120%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight14 2s ease;
  }

  &.pos15 {
    top: 66.5%;
    left: 11.5%;
    @keyframes moveToRight15 {
      0% {
        transform: translate(-25%, -108%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight15 2s ease;
  }

  &.pos16 {
    top: 70.8%;
    left: 26%;
    @keyframes moveToRight16 {
      0% {
        transform: translate(-113%, -32%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight16 2s ease;
  }

  &.pos17 {
    top: 69.8%;
    left: 40.3%;
    @keyframes moveToRight17 {
      0% {
        transform: translate(-113%, 10%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight17 2s ease;
  }

  &.pos18 {
    top: 64.8%;
    left: 57.8%;
    @keyframes moveToRight18 {
      0% {
        transform: translate(-138%, 40%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight18 2s ease;
  }

  &.pos19 {
    top: 62%;
    left: 73%;
    @keyframes moveToRight19 {
      0% {
        transform: translate(-120%, 23%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight19 2s ease;
  }
  &.pos20 {
    top: 66.8%;
    left: 84.8%;
    @keyframes moveToRight20 {
      0% {
        transform: translate(-93%, -38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight20 2s ease;
  }
  &.pos21 {
    top: 83.5%;
    left: 79.2%;
    @keyframes moveToRight21 {
      0% {
        transform: translate(44%, -130%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToRight21 2s ease;
  }

  // 역방향

  &.pos-0 {
    top: 0.8%;
    left: 4%;
    @keyframes moveToLeft-0 {
      0% {
        transform: translate(100%, 30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-0 2s ease;
  }

  &.pos-1 {
    top: 13.5%;
    left: 8.6%;
    @keyframes moveToLeft-1 {
      0% {
        transform: translate(100%, 30%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-1 2s ease;
  }

  &.pos-2 {
    top: 17.3%;
    left: 21.3%;
    @keyframes moveToLeft-2 {
      0% {
        transform: translate(125%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-2 2s ease;
  }

  &.pos-3 {
    top: 16%;
    left: 37.5%;
    @keyframes moveToLeft-3 {
      0% {
        transform: translate(105%, -45%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-3 2s ease;
  }

  &.pos-4 {
    top: 9.7%;
    left: 51.1%;
    @keyframes moveToLeft-4 {
      0% {
        transform: translate(102%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-4 2s ease;
  }

  &.pos-5 {
    top: 8.5%;
    left: 64%;
    @keyframes moveToLeft-5 {
      0% {
        transform: translate(102%, 10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-5 2s ease;
  }

  &.pos-6 {
    top: 9.9%;
    left: 77.1%;
    @keyframes moveToLeft-6 {
      0% {
        transform: translate(73%, 95%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-6 2s ease;
  }

  &.pos-7 {
    top: 22.3%;
    left: 86.5%;
    @keyframes moveToLeft-7 {
      0% {
        transform: translate(-15%, 125%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-7 2s ease;
  }

  &.pos-8 {
    top: 38.3%;
    left: 84.5%;
    @keyframes moveToLeft-8 {
      0% {
        transform: translate(-105%, 15%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-8 2s ease;
  }

  &.pos-9 {
    top: 40.5%;
    left: 70.8%;
    @keyframes moveToLeft-9 {
      0% {
        transform: translate(-103%, -38%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-9 2s ease;
  }

  &.pos-10 {
    top: 35.3%;
    left: 57.8%;
    @keyframes moveToLeft-10 {
      0% {
        transform: translate(-95%, -18%);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    animation: moveToLeft-10 2s ease;
  }

  &.pos-11 {
    top: 33%;
    left: 46%;
    @keyframes moveToLeft-11 {
      0% {
        transform: translate(-98%, 20%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-11 2s ease;
  }

  &.pos-12 {
    top: 36%;
    left: 33.5%;
    @keyframes moveToLeft-12 {
      0% {
        transform: translate(-118%, 15%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-12 2s ease;
  }

  &.pos-13 {
    top: 37.8%;
    left: 18.3%;
    @keyframes moveToLeft-13 {
      0% {
        transform: translate(-75%, 120%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-13 2s ease;
  }

  &.pos-14 {
    top: 53%;
    left: 8.3%;
    @keyframes moveToLeft-14 {
      0% {
        transform: translate(25%, 108%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-14 2s ease;
  }

  &.pos-15 {
    top: 66.5%;
    left: 11.5%;
    @keyframes moveToLeft-15 {
      0% {
        transform: translate(113%, 32%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-15 2s ease;
  }

  &.pos-16 {
    top: 70.8%;
    left: 26%;
    @keyframes moveToLeft-16 {
      0% {
        transform: translate(113%, -10%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-16 2s ease;
  }

  &.pos-17 {
    top: 69.8%;
    left: 40.3%;
    @keyframes moveToLeft-17 {
      0% {
        transform: translate(138%, -40%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-17 2s ease;
  }

  &.pos-18 {
    top: 64.8%;
    left: 57.8%;
    @keyframes moveToLeft-18 {
      0% {
        transform: translate(120%, -23%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-18 2s ease;
  }

  &.pos-19 {
    top: 62%;
    left: 73%;
    @keyframes moveToLeft-19 {
      0% {
        transform: translate(93%, 38%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-19 2s ease;
  }
  &.pos-20 {
    top: 66.8%;
    left: 84.8%;
    @keyframes moveToLeft-20 {
      0% {
        transform: translate(-44%, 130%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
    animation: moveToLeft-20 2s ease;
  }
  &.pos-21 {
    top: 83.5%;
    left: 79.2%;
  }
`;

const Timers = styled.div`
  display: flex;
  positon: absolute;
  justify-content: center;
`;

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
  sessionId,
  players,
  posList,
  whatDiceNum,
  myUserNameValue,
  setWhatDiceNum,
  setT1Pos,
  setT2Pos,
  t1Pos,
  t2Pos,
  sendPos,
  setNextThrowUser,
  nextThrowUser,
  turnNum,
  setTurnNum,
  myTurnNum,
  setIsGameOver,
  myGameNo,
  setWinner,
  setLoser,
  sendGameover,
  mySessionId,
}) => {
  const [diceValue, setDiceValue] = useState(null);
  const [showDiceToggle, setShowDiceToggle] = useState(false);
  const [chanceNum, setChanceNum] = useState(null);
  const [openChanceToggle, setOpenChanceToggle] = useState(false);
  const [isMoving, setIsMoving] = useState(undefined);
  let isRoll = false;
  // let isMoving = undefined;
  // var chanceNum = null;

  let tempMyTeam = [];
  let whatMyTeam = null;
  console.log("플레이어 배열 확인", players);

  // myTurnNum이 0, 1, 2이면 players 012 가져옴

  if (myTurnNum === 0 || myTurnNum === 1 || myTurnNum === 2) {
    tempMyTeam = players.slice(0, 3);
    whatMyTeam = Marker1IMG;
  } else {
    tempMyTeam = players.slice(3);
    whatMyTeam = Marker2IMG;
  }

  console.log("myTeam 확인점요..", tempMyTeam);
  const myTeamList = `우리팀: ${tempMyTeam[0]}, ${tempMyTeam[1]}, ${tempMyTeam[2]}`;

  // 찬스 모달
  // 모달 버튼 누르면 랜덤 숫자 발생 => 찬스 번호 부여
  const openChance = () => {
    const randomNum = Math.floor(Math.random() * 5);
    setChanceNum(randomNum);
  };

  // 찬스 번호 없을 때 찬스 모달 open
  useEffect(() => {
    if (chanceNum !== null) {
      setOpenChanceToggle(true);
    }
  }, [chanceNum]);

  const closeChance = () => {
    setOpenChanceToggle(false);
  };

  // 주사위 모달
  const openDice = () => {
    setShowDiceToggle(true);
    isRoll = true;
    console.log(isRoll);
    console.log("뜨나");
  };

  const closeDice = useEffect(() => {
    // console.log(diceValue);
    if (isRoll === false && diceValue !== null) {
      // checkDiceValue();
      setTimeout(() => {
        setShowDiceToggle(false);
      }, 1000);
      console.log("닫힌다");
    }
  }, [diceValue]);
  // console.log(diceValue);

  // 주사위 굴릴 때마다 위치 이동
  useEffect(() => {
    console.log("주사위 값은 " + diceValue);
    const arr = [0, 1, 2];
    if (t1Pos + diceValue >= 21 || t2Pos + diceValue >= 21) {
      useEffect = () => {
        if (t1Pos + diceValue >= 21) {
          setWinner(1);
          setLoser(2);
        } else {
          setWinner(2);
          setLoser(1);
        }
        setIsGameOver(true);
        // sendGameOver();
      };
    } else {
    // 주사위 1 나왔을 때
    if (isRoll === false && diceValue === 1) {
      setIsMoving(true);
      if (arr.includes(myTurnNum)) {
        setT1Pos(t1Pos + diceValue);
      } else {
        setT2Pos(t2Pos + diceValue);
      }
      setIsMoving(false);
    }
    // 주사위 2 이상
    if (isRoll === false && (diceValue === 2 || diceValue === 3)) {
      setIsMoving(true);
      if (arr.includes(myTurnNum)) {
        console.log("왜 안뜨노...");
        var i = 0;
        while (i < diceValue) {
          i++;
          console.log("왜 안됨");
          setTimeout(() => {
            setT1Pos((t1Pos) => t1Pos + 1);
          }, 1000 * i);
        }
      } else {
        console.log("왜 안뜨노...");
        var k = 0;
        while (k < diceValue) {
          k++;
          console.log("왜 안됨");
          setTimeout(() => {
            setT2Pos((t2Pos) => t2Pos + 1);
          }, 1000 * k);
        }
      }
      setIsMoving(false);
    }
    if (isMoving === false) {
        setDiceValue(null);
        console.log("1팀자리" + t1Pos);
        console.log("2팀자리" + t2Pos);
        if (arr.includes(turnNum)) {
          setTurnNum((turnNum + 3) % 6);
        } else if (turnNum === 5) {
          setTurnNum(0);
        } else {
          setTurnNum((turnNum - 2) % 6);
        }
        sendPos();
      }
    }
  }, [diceValue]);



  // useEffect (() => {
    
  // })

  console.log("지금 순서는 누구?" + turnNum);

  return (
    <Page>
      {/* <FrontimageDiv></FrontimageDiv> */}
      <Board>
        {/* <Quiz/> */}
        <MyTeamDiv>
          <MyTeamMarkerDiv src={whatMyTeam} alt="marker"></MyTeamMarkerDiv>
          {myTeamList}
        </MyTeamDiv>
        <Modal>
          {/* <span onClick={openChance}>I</span> */}
          {turnNum === myTurnNum ? (
            <DiceIcon
              src={Dice1}
              onClick={openDice}
              className={"nes-pointer"}
            />
          ) : (
            <span>{players[turnNum]}이 주사위를 던지는 중입니다..</span>
          )}
        </Modal>
        <ChanceModal
          open={openChanceToggle}
          close={closeChance}
          chanceNum={chanceNum}
        />
        <DiceModal
          open={showDiceToggle}
          close={closeDice}
          setDiceValue={setDiceValue}
          diceValue={diceValue}
          isRoll={isRoll}
        ></DiceModal>
        <Timers>{/* <Timer mm="1" ss="0" /> */}</Timers>
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
        <Marker1 className={`pos${t1Pos}`}>
          <img src={Marker1IMG} alt="marker1" id="marker1"></img>
        </Marker1>
        <Marker2 className={`pos${t2Pos}`}>
          <img src={Marker2IMG} alt="marker2"></img>
        </Marker2>
      </Board>
    </Page>
  );
};

export default Map;

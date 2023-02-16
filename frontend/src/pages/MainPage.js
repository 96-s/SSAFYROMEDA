import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//bootstrap css
import "nes.css/css/nes.min.css";

//IMAGE Components
import background from "resources/images/back1.jpg";
import title from "resources/images/title.png";
import insertcoin from "resources/images/insert_coin.png";
import person from "resources/images/person.png";
import notperson from "resources/images/notperson.png";

//Sound
import MusicContainer from "components/common/audio.js";
import Sound from "components/common/sound.js";
import ReactAudioPlayer from "react-audio-player";
import MainPageSound from '../resources/sounds/ssafyromeda_soundpack/00_mainbgm.wav';
import typing from '../resources/sounds/ssafyromeda_soundpack/02_typing.wav';
///////////////////             BODY
const BG = styled.div`
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;

  ///////////////////             Input CSS

  .nes-radio:checked + span::before {
    top: 4%;
    left: -15%;
    width: 0;
    height: 0;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    border-left: 20px solid rgb(255, 222, 173);
    border-right: 20px solid transparent;
    box-shadow: none !important;
  }
`;
/*******************  HEADER *******************/

///////////////////             Title DIV

const Titlediv = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 50%;
`;
const Title = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: motion 0.3s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 80px;
    }

    100% {
      margin-top: 90px;
    }
  }
`;
///////////////////             InserCoin(section)
const Insertcoin = styled.img`
  position: absolute;
  top: 200px;
  left: 50%;
  height: 3%;
  transform: translate(-50%, -50%);
  animation: motion 0.3s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 80px;
    }

    100% {
      margin-top: 90px;
    }
  }
`;
/*******************  SECTION *******************/

///////////////////             Section(Container)
const Container = styled.div`
  //   justify-content: space-between;
  //길이 임의 포지션에서 줄일 때
  // min-width: 1706px;
  width: 100vw;
  
  display: flex;
  position: relative;
  transform: translateY(-100%);
  margin: auto;
  bottom:-15%;
`;

///////////////////             Section(Left)
const Leftdiv = styled.div`
  width: 100%;
  height: 100%;
`;
const Leftimg = styled.img`
  width: 100%;
  height: 100%;
  
`;

///////////////////             Section(Middle)
const MiddelDiv = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;

  margin-top: 18%;
  text-align: center;
  font-size: 50px;
`;

///////////////////             Section(Right)
const RightDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Rightimg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 15%;
`;
const Span = styled.span`
  & > a:hover {
    color: white;
  }
  & > a {
    text-decoration: none;
  }
  a {
    color: yellow;
  }
`;
const Ddd=styled.div`
width: 100%;
height: 30%;
`;
///////////////////             Section(Input)
const Input = styled.input``;

///////////////////             Function
const MainPage = () => {
  const [inputStatus, setInputStatus] = useState(true);

  const handleClickRadioButton = () => {
    setInputStatus(inputStatus);
  };

  const soundEffect = () => {
    playSound(typing);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  };


  return (
    <>
      <BG>
        <ReactAudioPlayer
          urlsound={MainPageSound}
          isLoop={true}
          isPlaying={true}
          volumneNum={0.3}
        >
        </ReactAudioPlayer>
        <Titlediv>
          <Title src={title} />
          <br />
          <br />
          <br />
          <Insertcoin src={insertcoin} />
        </Titlediv>
        <Ddd></Ddd>
        <Container>
          <Leftdiv>
            <Leftimg src={person}></Leftimg>
          </Leftdiv>
          <MiddelDiv>
            <label>
              <Input
                type="radio"
                className="nes-radio"
                name="answer"
                checked={inputStatus}
                onChange={handleClickRadioButton}
              />

              <Span onClick={soundEffect}>
                <Link to="/explanation">GAME START</Link>

                {/* <Link to="/signup">회원가입 하기</Link> */}
              </Span>
            </label>
            <MusicContainer>
              <Sound />
            </MusicContainer>
          </MiddelDiv>
          <RightDiv>
            <Rightimg src={notperson}></Rightimg>
          </RightDiv>
        </Container>
      </BG>
    </>
  );
};
export default MainPage;

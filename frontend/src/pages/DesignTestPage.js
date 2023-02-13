import { useState } from "react";

import backgroundImg from "../resources/images/lobby_background4.png";
import alienImg from "../resources/images/alienImg.png";
import astroImg from "../resources/images/astroImgOriginal.png";
import styled from "styled-components";

import MyButton from "components/common/Button";
import Modal from "components/display/Modal";
import Logout from "components/common/Logout";

import buttonClick from "resources/sounds/ssafyromeda_soundpack/06_button.wav";

const Background = styled.div`
  background: url(${backgroundImg}) no-repeat center;
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
`;

// const MainContainer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 100px;
`;

const Alien = styled.img`
  opacity: 0.7;
  position: relative;
  margin-bottom: 230px;

  animation: alien 4s infinite;
}

@keyframes alien {

    50% {
        opacity: 0.2;
}

`;

const Astronauts = styled.img`
  position: absolute;

  animation: motion 1s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 200px;
    }

    100% {
      margin-top: 240px;
    }
  }
`;

const MyPageBalloon = styled.div`
  position: absolute;

  margin-left: 200px;
  margin-top: 200px;

  animation: ballon 1s linear 0s infinite alternate;

  @keyframes ballon {
    0% {
      margin-top: 170px;
    }

    100% {
      margin-top: 200px;
    }
  }
`;

const BoxContainer = styled.div`
  position: absolute;

  margin-left: 75%;
  margin-top: 170px;
  z-index: 99;

  text-align: center;
`;

const StartText = styled.h1`
  color: white;
  font-size: 40px;
`;

const ButtonBox = styled.div`
  width: 300px;
  height: 380px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 3px solid #dcdcdc;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

const LogoutButton = styled.div`
  position: absolute;

  margin-top: 10px;
  margin-left: 15px;
`;

const LabelDiv = styled.h3`
  color: white;
`;

const DesignTestPage = ({
  joinRoom,
  initRoom,
  sessionId,
  handleChangeSessionId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const soundEffect = () => {
    playSound(buttonClick);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  return (
    <div>
      <Background>
        <LogoutButton>
          <Logout />
        </LogoutButton>
        <BoxContainer>
          <StartText>게임 시작하기</StartText>
          <ButtonBox>
            <form className="form-group">
              <MyButton
                lang={"Korean"}
                text={"ㅤ우주선 생성ㅤ"}
                type={"is-warning"}
                onClick={initRoom}
              />
            </form>

            <InputContainer>
              <form className="form-group">
                <LabelDiv>우주선 입장 코드:</LabelDiv>
                <input
                  className="nes-input"
                  type="text"
                  id="sessionId"
                  value={sessionId}
                  onChange={handleChangeSessionId}
                  required
                />

                <MyButton
                  lang={"Korean"}
                  text={"입장"}
                  type={"is-success"}
                  onClick={joinRoom}
                />
              </form>
            </InputContainer>
          </ButtonBox>
        </BoxContainer>

        <MyPageBalloon
          className="nes-balloon from-right nes-pointer"
          onClick={() => {
            openModal();
            soundEffect();
          }}
        >
          내 정보
        </MyPageBalloon>
        <Modal
          className="nes-dialog is-rounded"
          open={modalOpen}
          close={closeModal}
          header="My Info"
        ></Modal>
        <CharacterContainer>
          <Alien src={alienImg} />
          <Astronauts src={astroImg} />
        </CharacterContainer>
      </Background>
    </div>
  );
};

export default DesignTestPage;

import React from "react";
import "./Gamemodal.css";
import DiceRoller from "components/utils/DiceRoller";
// import MyButton from "components/common/Button";
import styled from "styled-components";

const DiceContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Dice = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  align-items: center;
`;

const DiceModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    open,
    close,
    // header,
    isRoll,
    setIsRoll,
    sessionId,
    players,
    posList,
    turnNum,
    whatDiceNum,
    myUserNameValue,
    setWhatDiceNum,
    setDiceValue,
    diceValue,
    diceResult,
    setDiceResult,
  } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <DiceContainer>
            <Dice>
              <DiceRoller
                players={players}
                isRoll={isRoll}
                setIsRoll={setIsRoll}
                posList={posList}
                sessionId={sessionId}
                setDiceValue={setDiceValue}
                diceValue={diceValue}
                diceResult={diceResult}
                setDiceResult={setDiceResult}
              ></DiceRoller>
            </Dice>
          </DiceContainer>
          <footer>
            {/* <button className="close" onClick={close}>
              close
            </button> */}
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default DiceModal;

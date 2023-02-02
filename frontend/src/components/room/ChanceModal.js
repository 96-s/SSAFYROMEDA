import React from 'react';
import 'components/common/modal.css';
import styled from "styled-components";
import CardFrameIMG from "resources/images/Map/card-frame.png"
import Chance from './Chance';

const ChanceCard = styled.div`
    display: flex;
    justify-content: center;
    // padding: 20px;
    width: 340px;
    height: 460px;
    background: url(${CardFrameIMG}) no-repeat;
`;

const ChanceModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { 
    open, 
    close, 
    // header,
    isRoll,
    sessionIdValue,
    players,
    posList,
    turnNum,
    whatDiceNum,
    myUserNameValue,
    setWhatDiceNum,
    setDiceValue } = props;
  // const playerNum = players.length;
  const playerNum = 6;
  // const myTurnNum = players.indexOf(myUserNameValue);
  const myTurnNum = 1;
  


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <ChanceCard>
              <Chance/>
            </ChanceCard>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default ChanceModal;
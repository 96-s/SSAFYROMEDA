import React from 'react';
import 'components/common/modal.css';
import MyButton from "components/common/Button";
import styled from "styled-components";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MakeRoomDiv = styled.div`
  flex: auto;
`;

const MakeRoomModal = (props) => {
  const navigate = useNavigate();
  
  const onClickMoveGamePage = () => {
    navigate('/game')
  }

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    open,
    close, 
    header,
    mySessionIdValue,
    publisher,
    players,
    subscribers, } = props;
  const [isMade, setIsMade] = useState(false);

  const makeCode = () => {

    const nextTurnNum = Math.floor(Math.random() * 6);
    const nextPlayer = players[nextTurnNum];

    const sendData = {
      session: mySessionIdValue,
      to: [],
      data: JSON.stringify({
        nextTurnNum: nextTurnNum,
        nextPlayer: nextPlayer,


      })
    };
    fetch('https://i8d205.p.ssafy.io:4443/openvidu/api/signal', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:ssafyromeda'),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(sendData),
    });
    setIsMade(!isMade);

  }
  // const toggleIsMade = () => {
  //   ;
  // }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
          </header>
          <main>
            <MakeRoomDiv>
              {!isMade &&
                <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"초대코드 생성"}
                  onClick={makeCode}
                />
              }
              <div>
                {/* <input className="editNickname" type="text"></input> */}
              </div>
              {isMade && 
                <div>

                  <span>{'초대코드'}</span>
                  <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"입장"}
                  onClick={() => {onClickMoveGamePage();}}
                  />
                </div>
              }
            </MakeRoomDiv>
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
export default MakeRoomModal;
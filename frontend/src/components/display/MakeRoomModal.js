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
  
  const onClickMoveGamePage = (props) => {
    navigate('/game', {state : props})
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
  const [roomCode, setRoomCode] = useState("");

  const getCode = async () => {

    const response=await axios.post(
      "https://i8d205.p.ssafy.io/api/rooms/",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type" : "application/json",
          //로그인 새로 할때마다 Authorization 코드 바꿔야함
          Authorization : "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsIm5vIjozLCJyb2xlIjoiVVNFUiIsImV4cCI6MTY3NTczNzAyNn0.m2A6biofgBExozRUe6IxX2LvAnv3GPvrXhGVCEAddDaHKPSdfKpmkse0kZ39628ZxMQws9JpwkMHVmQU6xAEKw",
        },
      }
    );
    setRoomCode(response.data);
    setIsMade(!isMade);
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <MakeRoomDiv>
              {!isMade &&
                <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"초대코드 생성"}
                  onClick={getCode}
                />
              }
              <div>
                {/* <input className="editNickname" type="text"></input> */}
              </div>
              {isMade && 
                <div>

                  <span>{roomCode}</span>
                  <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"입장"}
                  onClick={() => {onClickMoveGamePage({roomCode});}}
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
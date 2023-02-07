import React from "react";
import "components/common/modal.css";
import MyButton from "components/common/Button";
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MakeRoomDiv = styled.div`
  flex: auto;
`;

const MakeRoomModal = (props) => {
  const navigate = useNavigate();

  const onClickMoveGamePage = (props) => {
    navigate("/game", { state: props });
  };

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    open,
    close,
    header,
    mySessionIdValue,
    publisher,
    players,
    subscribers,
  } = props;

  // store에서 roomCode를 받아온다.
  const roomCode = useSelector((state) => state.auth.roomCode);
  console.log(roomCode);

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
              <div>
                <span>{roomCode}</span>
                <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"입장"}
                  onClick={() => {
                    onClickMoveGamePage({ roomCode });
                  }}
                />
              </div>
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

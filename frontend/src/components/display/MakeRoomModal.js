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

const Header = styled.div`
  color: black;
  margin: 20px 0px 10px 0px;
`;
const Main = styled.main`
  display: flex;
  padding: 5%;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  justify-content: center;
`;
const RoomcodeDiv = styled.div`
  color: black;
  display: center;
`;

const MakeRoomModal = (props) => {
  const navigate = useNavigate();

  const onClickMoveGamePage = (props) => {
    navigate("/test2", { state: props });
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
    joinRoom,
  } = props;

  // store에서 roomCode를 받아온다.
  const roomCode = useSelector((state) => state.auth.roomCode);
  console.log("룸코드는?:", roomCode);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <Header>{header}</Header>
          <Main>
            <MakeRoomDiv>
              <div>
                <RoomcodeDiv>
                  <span className="nes-text is-primary">{roomCode}</span>
                </RoomcodeDiv>
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
          </Main>
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

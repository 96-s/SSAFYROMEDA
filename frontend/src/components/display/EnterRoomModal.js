import React, { useEffect, useState } from "react";
import "components/common/modal.css";
import MyButton from "components/common/MyButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
// import { useState } from 'react';

const MakeRoomDiv = styled.div`
  flex: auto;
`;

const InputDiv = styled.div`
  width: 300px;
  float: left;
`;
const Header = styled.div`
  color: black;
  margin: 20px 0px 10px 0px;
  
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 10px;
`;
const Span=styled.span`
  color:black;
`;
const EnterRoomModal = (props) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { form, userNo, userNickname, joinError, isJoin } = useSelector(
    (state) => ({
      form: state.auth.joinRoom,
      userNo: state.auth.user?.userNo,
      userNickname: state.auth.user?.userNickname,
      joinError: state.auth.error,
      isJoin: state.auth.isJoin,
    })
  );

  const temp = useSelector((state) => state.auth);
  console.log("테스트2: ", temp);

  // 1. input 변경 이벤트 핸들러
  const onChange = (e) => {
    let { name, value } = e.target;
    dispatch(
      authActions.changeField({
        form: "joinRoom",
        key: name,
        value,
      })
    ); // value: 입력되는 문자
  };

  // 2. form 등록 이벤트 핸들러
  const onSubmit = (e) => {
    const { roomCode } = form;
    e.preventDefault();
    const user = { userNo, userNickname };
    dispatch(authActions.joinGameRoomStart({ user, roomCode }));
    console.log("방 입장 요청 액션 시작!");
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  // 3. 입장 성공 / 실패 처리
  useEffect(() => {
    if (joinError) {
      setError(joinError);
      return;
    }

    if (isJoin) {
      console.log("방 입장 성공");
      // 게임방으로 입장
      navigate("/game");
    }
  }, [joinError, dispatch, navigate]);

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  // const [isMade, setIsMade] = useState(false);
  // const toggleIsMade = () => {
  //   ;
  // }

  // const onClickJoinGame = (roomCode, capacity, host) => {
  //   navigate('/openvidutest', {
  //     state: {
  //       sessionNickname: nickname,
  //       sessionRoomId: roomCode,
  //       sessionCapacity: capacity,
  //       sessionHost: host,
  //     },
  //   });
  // };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <Header>
            {header}
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
          </Header>
          <main>
            <MakeRoomDiv>
              <Span>초대코드를 입력해주세요.</Span>
              <form onSubmit={onSubmit} onKeyDown={(e) => onCheckEnter(e)}>
                <InputDiv>
                  <input
                    className="nes-input is-dark"
                    name="roomCode"
                    placeholder="방 코드를 입력하세요"
                    onChange={onChange}
                  />
                </InputDiv>
                <MyButton
                  lang={"Korean"}
                  type={"is-primary"}
                  text={"입장"}
                  onClick={onSubmit}
                />
              </form>
            </MakeRoomDiv>
            <ErrorMsg>{error}</ErrorMsg>
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
export default EnterRoomModal;

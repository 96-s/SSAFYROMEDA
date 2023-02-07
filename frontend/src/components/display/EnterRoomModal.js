import React, { useEffect, useState } from "react";
import "components/common/modal.css";
import MyButton from "components/common/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
// import { useState } from 'react';

const MakeRoomDiv = styled.div`
  flex: auto;
`;

const EnterRoomModal = (props) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickMoveGamePage = () => {
    navigate("/game");
  };

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
    let { value } = e.target;
    dispatch(authActions.changeFieldGameRoom({ value })); // value: 입력되는 문자
  };

  const onSubmit = (e) => {
    dispatch(authActions.joinGameRoomStart({}));
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
      // navigate("/게임방");
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
          <header>
            {header}
            {/* <button className="close" onClick={close}>
              &times;
            </button> */}
          </header>
          <main>
            <MakeRoomDiv>
              <span>초대코드를 입력해주세요.</span>
              <div>
                <input
                  className="inviteCode"
                  type="text"
                  onChange={onChange}
                ></input>
              </div>
              <div>
                <span>{"초대코드"}</span>
                <MyButton
                  type={"Korean"}
                  className={"is-primary"}
                  text={"입장"}
                  onClick={() => {
                    onSubmit();
                    onClickMoveGamePage();
                  }}
                  // onClick={
                  //   // ()=> {
                  //   onClickMoveGamePage();
                  //   // onClickJoinGame(
                  //   //   `${myGamePlanList[count].roomCode}`,
                  //   //   `${myGamePlanList[count].maxCapacity}`,
                  //   //   `${myGamePlanList[count].host}`,
                  //   // );
                  //   // }
                  // }
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
export default EnterRoomModal;

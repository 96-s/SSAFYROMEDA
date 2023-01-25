import React from 'react';
import 'components/common/modal.css';
import MyButton from "components/common/Button";
import styled from "styled-components";
// import { useState } from 'react';

const MakeRoomDiv = styled.div`
  flex: auto;
`;

const EnterRoomModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  // const [isMade, setIsMade] = useState(false);
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
                <span>초대코드를 입력해주세요.</span>
              <div>
                <input className="editNickname" type="text"></input>
              </div>
              <div>

                <span>{'초대코드'}</span>
                <MyButton
                type={"Korean"}
                className={"is-primary"}
                text={"입장"}
                onClick={"임시"}
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
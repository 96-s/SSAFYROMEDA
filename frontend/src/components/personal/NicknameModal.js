import React from 'react';
import 'components/common/modal.css';
import MyButton from "components/common/Button";
import styled from "styled-components";

const ChangeNicknameDiv = styled.div`
  flex: auto;
`;

const NicknameModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

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
            <ChangeNicknameDiv>
              <div>
                <span>닉네임을 수정해주세요.</span>
                <br></br>
                <input className="editNickname" type="text"></input>
              </div>
              <MyButton
                type={"Korean"}
                className={"is-primary"}
                text={"완료"}
                onClick={"임시"}
              />
            </ChangeNicknameDiv>
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
export default NicknameModal;
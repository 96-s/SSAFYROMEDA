
import styled from "styled-components";
import MyButton from "components/common/Button";
import NicknameModal from "components/personal/NicknameModal";
import "./MyInfo.css";
import React, { useState } from 'react';
// import { useSelector } from "react-redux";

const NicknameDiv = styled.div`
  display: flex;
`;



const MyInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const { id, nickname } = useSelector((state) => state.auth.user);
  // const [isEdit, setIsEdit] = useState(false);

  // const toggleIsEdit = () => setIsEdit(!isEdit);
  
  const DUMMY_INFOS = [
    { 
      id: 'p1', 
      nickname: '정은',
    },
    // { 
    //   id: 'p2', 
    //   nickname: '정은2'
    // },
  ]  
  return (
    <div>
      <ul>
        <li>아이디: {DUMMY_INFOS.id}</li>
        <NicknameDiv>
          <li>닉네임: {DUMMY_INFOS.nickname}</li>
          <span>　</span>
          <MyButton
            type={"Korean"}
            className={"is-primary"}
            text={"수정"}
            onClick={openModal}
          />
          <NicknameModal open={modalOpen} close={closeModal} header="닉네임 수정">
            {/* <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 */}
            들어가
          </NicknameModal>
        </NicknameDiv>
      </ul>
    </div>
  );
};

export default MyInfo;
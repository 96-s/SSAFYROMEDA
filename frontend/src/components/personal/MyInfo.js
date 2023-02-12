import MyButton from "components/common/Button";
import NicknameModal from "components/personal/NicknameModal";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";

const ContentDiv = styled.div`
  font-size: 20px;
  text-align: left;
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
  
  const userInfo = useSelector(state => state.auth)
  
  const userId = userInfo.user.userEmail
  const userNickname = userInfo.user.userNickname

  return (
    <div>
      <ul>
        <ContentDiv>
          <li>아이디: {userId}</li>
          <div className="nickname">
            <li>닉네임: {userNickname}</li>
            <span>　</span>
            <MyButton
              lang={"Korean"}
              type={"is-primary"}
              text={"수정"}
              onClick={openModal}
              />
            <NicknameModal open={modalOpen} close={closeModal} header="닉네임 수정">
            </NicknameModal>
          </div>
        </ContentDiv>
      </ul>
    </div>
  );
};

export default MyInfo;
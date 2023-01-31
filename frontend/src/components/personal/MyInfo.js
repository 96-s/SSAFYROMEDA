import MyButton from "components/common/Button";
import NicknameModal from "components/personal/NicknameModal";
import React, { useState } from 'react';
// import { useSelector } from "react-redux";



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
  
  const DUMMY_INFOS = { 
      id: 'p1', 
      nickname: '정은',
  };
  return (
    <div>
      <ul>
        <li>아이디: {DUMMY_INFOS.id}</li>
        <div className="nickname">
          <li>닉네임: {DUMMY_INFOS.nickname}</li>
          <span>　</span>
          <MyButton
            type={"Korean"}
            className={"is-primary"}
            text={"수정"}
            onClick={openModal}
          />
          <NicknameModal open={modalOpen} close={closeModal} header="닉네임 수정">

          </NicknameModal>
        </div>
      </ul>
    </div>
  );
};

export default MyInfo;

import styled from "styled-components";
import MyButton from "components/common/Button";
import "./MyInfo.css";
// import { useSelector } from "react-redux";

const NicknameDiv = styled.div`
  display: flex;
`;



const MyInfo = () => {
  // const { id, nickname } = useSelector((state) => state.auth.user);
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
                  onClick={() => {}}
              />
          </NicknameDiv>
      </ul>
    </div>
  );
};

export default MyInfo;
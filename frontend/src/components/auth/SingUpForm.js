import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "components/common/MyButton";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 50px;
`;

const SignupText = styled.div`
  font-size: 1.25rem;
  color: white;

  margin-top: -30px;
  margin-bottom: 20px;
`;

const InputDiv = styled.div`
  width: 300px;
  float: left;
`;

const ButtonDiv = styled.div`
  float: right;

  margin-left: 10px;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 1rem;
  margin-top: 10px;
`;

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, isNickname, authError } = useSelector((state) => ({
    form: state.auth.register,
    isNickname: state.auth.isNickname,
    authError: state.auth.error,
  }));

  const temp = useSelector((state) => state.auth);
  console.log("테스트: ", temp);

  // 1. input 변경 이벤트 핸들러
  const onChange = (e) => {
    let { name, value } = e.target;
    dispatch(
      authActions.changeField({
        form: "register",
        key: name,
        value,
      })
    ); // value: 입력되는 문자
  };

  // 2. form 등록 이벤트 핸들러
  const onSubmit = (e) => {
    const { userNickname, userNo } = form;
    e.preventDefault();
    if (userNickname.length > 8) {
      console.log("닉네임 8글자 초과했다");
      setError("닉네임은 8글자 이하로 입력해야 합니다.");
      return;
    }

    var blank_pattern = /^\s+|\s+$/g;
    if (userNickname.replace(blank_pattern, "") == "") {
      console.log("공백만 입력됨!");
      setError("공백은 사용할 수 없습니다.");
      return;
    }
    var blank_pattern2 = /[\s]/g;
    if (blank_pattern2.test(userNickname) == true) {
      console.log("공백이 포함됨!");
      setError("공백은 사용할 수 없습니다.");
      return;
    }

    if (userNickname) {
      dispatch(authActions.createNicknameStart({ userNickname, userNo }));
    } else {
      setError("닉네임을 입력해주세요.");
      console.log("닉네임 비었다");
      return;
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  // 3. 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 닉네임 입력 중 에러발생
      setError(authError);
      return;
    }

    // 닉네임 입력 성공하면 유저정보를 받아온 후 lobby 페이지로 보낸다
    if (isNickname) {
      const { userNo } = form;
      console.log("닉네임 설정 성공");
      dispatch(authActions.getUserInfoStart(userNo));
      navigate("/lobby");
    }
  }, [isNickname, authError, dispatch, navigate]);

  return (
    <div>
      <InputContainer>
        <SignupText>당신의 이름은?</SignupText>
        <form onSubmit={onSubmit} onKeyDown={(e) => onCheckEnter(e)}>
          <InputDiv>
            <input
              className="nes-input is-dark"
              name="userNickname"
              placeholder="닉네임을 입력하세요"
              onChange={onChange}
            />
          </InputDiv>
          <ButtonDiv>
            <MyButton
              lang={"Korean"}
              text={"결정"}
              type={"is-success"}
              onClick={onSubmit}
            />
          </ButtonDiv>
        </form>

        <ErrorMsg>{error}</ErrorMsg>
      </InputContainer>
    </div>
  );
};

export default SignUpForm;

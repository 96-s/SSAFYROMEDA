import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import MyButton from "components/common/Button";
import styled from "styled-components";

// 적용x -> 수정필요
const InputContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  float: left;
`;

const ButtonDiv = styled.div`
  // float: left;
`;

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { form, isAuth, authError } = useSelector((state) => ({
    form: state.auth.register,
    isAuth: state.auth.isAuth,
    authError: state.auth.error,
    test: state.auth.test,
  }));

  const temp = useSelector((state) => state.auth);
  console.log("테스트: ", temp);

  // 1. input 변경 이벤트 핸들러
  const onChange = (e) => {
    let { value } = e.target;
    dispatch(authActions.changeField({ value })); // value: 입력되는 문자
  };

  // 2. form 등록 이벤트 핸들러
  const onSubmit = (e) => {
    const { userNickname, userEmail } = form;
    e.preventDefault();
    if (userNickname.length > 8) {
      // 에러메세지 상자 출력시켜야함
      console.log("닉네임 8글자 초과했다");
      setError("닉네임은 8글자 이하로 입력해야 합니다.");
      return;
    }
    if (userNickname) {
      dispatch(authActions.createNicknameStart({ userNickname, userEmail }));
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

    // isAuth 대신 닉네임 입력받은 상태를 나타낼 다른 변수 필요
    if (isAuth) {
      console.log("닉네임 설정 성공");
      navigate("/lobby");
    }
  }, [isAuth, authError, dispatch, navigate]);

  return (
    <div>
      <InputContainer>
        <form onSubmit={onSubmit} onKeyDown={(e) => onCheckEnter(e)}>
          <input
            className="nes-input is-dark"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
          />
          <ButtonDiv>
            <MyButton
              lang={"Korean"}
              text={"결정"}
              type={"is-success"}
              onClick={onSubmit}
            />
          </ButtonDiv>
        </form>
      </InputContainer>
    </div>
  );
};

export default SignUpForm;

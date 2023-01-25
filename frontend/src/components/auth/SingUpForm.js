import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import MyButton from "components/common/Button";

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const temp = useSelector((state) => state.auth);
  console.log("테스트: ", temp);

  // 1. input 변경 이벤트 핸들러
  const onChange = (e) => {
    let { value } = e.target;
    dispatch(authActions.changeField(value));
  };

  // 2. form 등록 이벤트 핸들러
  const onSubmit = (e) => {
    //   const { nickname } = form;
    e.preventDefault();
    //     if (nickname.lenght > 8) {
    //       setError("닉네임은 8글자 이하로 입력해야 합니다.");
    //       return;
    //     }
    //     if (nickname) {
    //       dispatch(authActions.createNicknameStart(nickname));
    //     } else {
    //       setError("닉네임을 입력해주세요.");
    //       return;
    //     }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  // 3. 회원가입 성공 / 실패 처리
  //   useEffect(() => {
  //     if (authError) {
  //       // 닉네임 입력 중 에러발생
  //       setError(authError);
  //       return;
  //     }

  //     // isAuth 대신 닉네임 입력받은 상태를 나타낼 다른 변수 필요
  //     if (isAuth) {
  //       console.log("닉네임 설정 성공");
  //       navigate("/lobby");
  //     }
  //   }, [isAuth, authError, dispatch, navigate]);

  return (
    <div>
      <h3>닉네임 입력</h3>
      <form onSubmit={onSubmit} onKeyDown={(e) => onCheckEnter(e)}>
        <input
          name="nickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChange}
        />
        <MyButton
          lang={"Korean"}
          text={"제출"}
          type={"is-success"}
          onClick={onSubmit}
        />
      </form>
    </div>
  );
};

export default SignUpForm;

import styled, { css } from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;

  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;

  white-space: nowrap;
  font-family: "Nanum Pen Script";
`;

// .MyButton {
//     cursor: pointer;
//     border: none;
//     border-radius: 5px;

//     padding-top: 10px;
//     padding-bottom: 10px;
//     padding-left: 20px;
//     padding-right: 20px;

//     font-size: 18px;

//     white-space: nowrap;
//     font-family: "Nanum Pen Script";
//   }

//   .MyButton_default {
//     background-color: #ececec;
//     color: black;
//   }

//   .MyButton_positive {
//     background-color: #64c964;
//     color: white;
//   }

//   .MyButton_negative {
//     background-color: #fd565f;
//     color: white;
//   }

const Button = ({ text, style, onClick }) => {
  return (
    <div>
      <StyledButton style={style} onClick={onClick}>
        {text}
      </StyledButton>
    </div>
  );
};

export default Button;

// const MyButton = ({ text, type, onClick }) => {
//   // btnType은 필요한 종류에 따라서 바꾸면 됨 (+ css 함께 수정)
//   const btnType = ["positive", "negative"].includes(type) ? type : "default";
//   return (
//     <button
//       className={["MyButton", `MyButton_${btnType}`].join(" ")}
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
// };

// MyButton.defaultProps = {
//   type: "default",
// };

// export default MyButton;

// 버튼 사용법 예시
// <MyButton
//     type={"positive"}
//     text={"새 일기쓰기"}
//     onClick={() => navigate("/new")}
// />

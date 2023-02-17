import "nes.css/css/nes.min.css";
import "./MyButton.css";





const MyButton = ({ lang, text, type, onClick }) => {
  // btnType은 필요한 종류에 따라서 바꾸면 됨 (+ css 함께 수정)
  const btnType = [
    "is-primary",
    "is-success",
    "is-warning",
    "is-error",
  ].includes(type)
    ? type
    : "";

  return (
    <div>
      <div className={["MyButton", `MyButton_${lang}`].join(" ")}>
        <button
          type="button"
          className={`nes-btn ${btnType}`}
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;

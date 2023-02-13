import React from "react";
import "components/common/modal.css";
import MyInfo from "components/personal/MyInfo";
import buttonClick from "resources/sounds/ssafyromeda_soundpack/06_button.wav";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;

  // 브금
  const soundEffect = () => {
    playSound(buttonClick);
  };

  function playSound(soundName) {
    var audio = new Audio(soundName);
    audio.play();
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <main>
            <MyInfo />
          </main>
          <footer>
            <button className="close" onClick={() => {
              close();
              soundEffect();
            }}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;

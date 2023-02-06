import styled from "styled-components";

// 뒷배경 어둡게
const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

// 타이틀 문구, 내부 텍스트 스타일
const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.125rem;
  }
`;

// 선택, 취소 버튼을 둘러싸는 div
const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const Dialog = ({ title, children, confirmText, cancelText }) => {
  return (
    <dialog className="nes-dialog is-rounded" id="dialog-rounded">
      <form method="dialog">
        <p className="title">{title}</p>
        <p>{children}.</p>
        <menu className="dialog-menu">
          <button className="nes-btn">{cancelText}</button>
          <button className="nes-btn is-primary">{confirmText}</button>
        </menu>
      </form>
    </dialog>

    // <DarkBackground>
    //   <DialogBlock>
    //     <h3>{title}</h3>
    //     <p>{children}</p>
    //     <ButtonGroup>
    //       <Button color="gray">{cancelText}</Button>
    //       <Button color="pink">{confirmText}</Button>
    //     </ButtonGroup>
    //   </DialogBlock>
    // </DarkBackground>
  );
};

export default Dialog;

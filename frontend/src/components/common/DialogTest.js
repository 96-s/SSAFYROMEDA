import { useState } from "react";

import Dialog from "./Dialog";

const DialogTest = () => {
  const [dialog, setDialog] = useState(false);

  const onClick = () => {
    setDialog(true);
  };

  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };

  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  return (
    <div>
      <button onClick={onClick}>삭제</button>

      <Dialog
        title="진짜로 정말로 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        visible={dialog}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        진짜?
      </Dialog>
    </div>
  );
};

export default DialogTest;

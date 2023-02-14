import { useState, useEffect } from "react";

import { minigameList } from "./MinigameList1";
import Timer from "../common/Timer";

const MiniGame1 = ({ playTeam }) => {
  let [timeOver, setTimeOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); // 미니게임 성공 여부 (제일 상단으로 옮길 것)

  // Math.random()*(최댓값-최소값) + 최솟값
  const randomNum = Math.floor(Math.random() * (4 - 0) + 0); // 0, 1, 2, 3
  const quiz = minigameList[randomNum][0]; // 문제
  const answer = minigameList[randomNum][1]; // 정답

  useEffect(() => {
    let autoTimer = setTimeout(() => {
      setTimeOver(true);
      setIsSuccess(false);
    }, 11000);
  }, []);

  // 세명 다 정답을 맞춘 경우에만 isSuccess = true

  return (
    <div>
      <h1>{quiz}</h1>
      <Timer mm={0} ss={10} />

      {timeOver === true ? (
        <div>
          <p>Fail...</p>
        </div>
      ) : null}
    </div>
  );
};

export default MiniGame1;

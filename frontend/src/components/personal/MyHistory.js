// import { useSelector } from "react-redux";


const MyHistory = () => {
  // const nickname = useSelector((state) => state.auth.user);
  // const winHistory = useSelector((state) => state.gameHistory.win);
  // const loseHistory = useSelector((state) => state.gameHistory.lose);
 

  return (
    <div>
      <h2>nickname의 탈출일지</h2>
      <ul>
        <li>탈출성공: winHistory회</li>
        <li>탈출실패: loseHistory회</li>
      </ul>
      
    </div>
  );
};

export default MyHistory;
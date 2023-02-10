const GameController = ({
  t1Pos, // 팀 1 현재 위치
  t2Pos, // 팀 2 현재 위치
  myGameNo, // 게임 내 고유 번호
  throwUser, // 주사위 던지는 유저
  isDice, // 내가 주사위 던지는지 여부
  myTeam, // 내 팀
  gameTurn, // 이번 턴에 게임 진행하는 여부
  subscribers, // 자신을 제외한 게임 내 참여자(구독자)
}) => {
  // 게임 시작 버튼을 통해 이벤트 받을 때
  const gameStart = (event) => {
    sendGameResetSignal(subscribers).then((response) => {
      t1Pos = response.data.t1Pos;
      t2Pos = response.data.t2Pos;
      throwUser = response.data.throwUser;
    });

    /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(3000))------------------ */
    checkDiceTurn();
  };

  const checkDiceTurn = (event) => {};

  const sendGameResetSignal = async (subscribers) => {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: this.state.mySessionId,
        to: this.state.subscribers,
        type: "GAME_RESET",
        data: {
          // 게임 시작 전 변조 방지를 위한 게임 세팅 초기화
          t1Pos: 0,
          t2Pos: 0,
          throwUser: 0,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    console.log("게임이 시작하니 게임 상태를 초기로 되돌리라고 전달함");
    return response.data;
  };

  const sendPos = async (subscribers) => {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: this.state.mySessionId,
        to: this.state.subscribers,
        type: "TURN_UPDATE",
        data: {
          t1Pos: this.state.t1Pos,
          t2Pos: this.state.t2Pos,
          throwUser: this.state.throwUser,
        },
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:ssafyromeda"),
        },
      }
    );
    console.log("위치 전송함");
    return response.data;
  };
};
export default GameController;

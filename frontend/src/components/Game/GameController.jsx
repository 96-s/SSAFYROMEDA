import axios from "axios";

const GameController = ({
  mySessionId,
  subscribers, // 자신을 제외한 게임 내 참여자(구독자), array
  t1Pos, // 팀 1 현재 위치, int
  t2Pos, // 팀 2 현재 위치, int
  myGameNo, // 게임 내 고유 번호, int
  isHostPlayer, // 방장인지 아닌지, bool
  throwUser, // 주사위 던지는 유저, int
  isDice, // 내가 주사위 던지는지 여부, bool
  myTeam, // 내 팀 ??
  gameTurn, // 이번 턴에 게임 진행하는 여부, bool
  ourTeams, // 우리 팀원들 (자신 제외), array
  theirTeams, // 상대 팀원들, array
}) => {
  // 게임 시작 버튼을 통해 이벤트 받을 때
  const gameFlowStart = (event) => {
    if (isHostPlayer) {
      sendGameResetSignal(subscribers).then((response) => {
        if (response.data.reset) GameReset();
      });
    }
    /* --------------게임 스타트 애니메이션 여기 삽입(setTimeOut(?))------------------ */
    checkDiceTurn();
    sendPos(subscribers); // Event or UseEffect 를 통해 조건 발동 예정
  };

  const checkDiceTurn = (event) => {};

  // 게임 시작 전, 후 상태 초기화를 위해
  const sendGameResetSignal = async (subscribers) => {
    console.log("게임 리셋!");
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: mySessionId,
        to: subscribers,
        type: "GAME_RESET",
        data: {
          t1Pos: 0, // 1팀 위치 초기화
          t2Pos: 0, // 2팀 위치 초기화
          throwUser: 0, // 첫 번째 사람 주사위 던지게 세팅
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
    return response.data;
  };

  // 변화한 위치 정보를 보내는 함수
  const sendPos = async (subscribers) => {
    const response = await axios.post(
      "https://i8d205.p.ssafy.io/openvidu/api/signal",
      {
        session: mySessionId,
        to: subscribers,
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

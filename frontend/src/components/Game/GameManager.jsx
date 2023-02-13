import GameController from "./GameController";
import { useState } from "react";

const GameManager = () => {
  //비디오 관련 변수
  const [ov, setOv] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mySessionId, setMySessionId] = useState("");
  const [streamManager, setStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [isMike, setIsMike] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  // 게임 관련 변수
  const [t1Pos, setT1Pos] = useState(0);
  const [t2Pos, setT2Pos] = useState(0);
  // 게임 내 고유 번호
  const [myGameNo, setMyGameNo] = useState(0);
  // 주사위 던지는 유저
  const [nextThrowUser, setNextThrowUser] = useState(0);
  // 내가 주사위 던지는지 여부
  const [isDiceThrow, setIsDiceThrow] = useState(false);
  // 내 팀
  const [myTeam, setMyTeam] = useState(1);
  const [team1Members, setTeam1Members]=useState([]);
  const [team2Members, setTeam2Members]=useState([]);
  // 이번 턴에 게임 진행하는 여부
  const [gameTurn, setGameTurn] = useState(true);

  return (
    <GameController
      //비디오 관련 변수
      ov={ov}
      session={session}
      mySessionId={mySessionId}
      streamManager={streamManager}
      publisher={publisher}
      subscribers={subscribers}
      isMike={isMike}
      isCamera={isCamera}
      isSpeaker={isSpeaker}
      currentVideoDevice={currentVideoDevice}
      setOv={setOv}
      setSession={setSession}
      setMySessionId={setMySessionId}
      setStreamManager={setStreamManager}
      setPublisher={setPublisher}
      setSubscribers={setSubscribers}
      setIsMike={setIsMike}
      setIsCamera={setIsCamera}
      setIsSpeaker={setIsSpeaker}
      setCurrentVideoDevice={setCurrentVideoDevice}

      //게임 관련 변수
      t1Pos={t1Pos}
      setT1Pos={setT1Pos}
      t2Pos={t2Pos}
      setT2Pos={setT2Pos}
      myGameNo={myGameNo}
      setMyGameNo={setMyGameNo}
      nextThrowUser={nextThrowUser}
      setNextThrowUser={setNextThrowUser}
      isDiceThrow={isDiceThrow}
      setIsDiceThrow={setIsDiceThrow}
      myTeam={myTeam}
      setMyTeam={setMyTeam}
      gameTurn={gameTurn}
      team1Members={team1Members}
      setTeam1Members={setTeam1Members}
      team2Members={team2Members}
      setTeam2Members={setTeam2Members}
    />
  );
};
export default GameManager;

const GameManager = () =>{

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
    const [throwUser, setThrowUser] = useState(0);
    // 내가 주사위 던지는지 여부
    const [isDice, setIsDice] = useState(true);
    // 내 팀
    const [myTeam, setMyTeam] = useState(1);
    // 이번 턴에 게임 진행하는 여부
    const [gameTurn, setGameTurn] = useState(true);


    return(
        <VideoController
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

            //게임 관련 변수
            t1Pos={t1Pos}
            t2Pos={t2Pos}
            myGameNo={myGameNo}
            throwUser={throwUser}
            isDice={isDice}
            myTeam={myTeam}
            gameTurn={gameTurn}
        />
    );

};
export default GameManager

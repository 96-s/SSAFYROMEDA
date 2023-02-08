import OurTeamVid from "./OurTeamVid";
import TheirTeamVid from "./TheirTeamVid";
import Map from "./Map";

import styled from "styled-components";

const OpenViduSessionBlock = styled.div`
    width: 100vw;
    hegith: 100vh;
`;

const OpenViduSession = ({
    posList,
    sessionId,
    setIsGameDone,
    isGameDone,
    nextPlayer,
    setNextPlayer,
    isRoll,
    setIsRoll,
    handleMainVideoStream,
    switchCamera,
    leaveSession,
    myUserNameValue,
    mainStreamManager,
    publisher,
    players,
    subscribers,
    session,
    turnNum,
    setTurnNum,
    setPosList,
    minigameType,
    setMinigameType,
    whatDiceNum,
    setWhatDiceNum
}) => {

    const playerNum = players.length; // 몇 명에서 하는지
    const myTurnNum = players.indexOf(myUserNameValue);
    
    return (
        <OpenViduSessionBlock>
            <OurTeamVid/>
                <Map
                    posList={posList}
                    sessionId={sessionId}/>
            <TheirTeamVid/>
        </OpenViduSessionBlock>
    )
}

export default OpenViduSession;
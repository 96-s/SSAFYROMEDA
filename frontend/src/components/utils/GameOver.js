import defeatImg from "resources/images/defeat.png";
import victoryImg from "resources/images/victory2.png";

import styled from "styled-components";

const GameOverContainer = styled.div`
    animation: bounce 0.3s ease infinite alternate;
    @keyframes bounce {
        100% {
          top: -20px;
        }

`;

const GameOver = ({
    myTeam,
    winner,
    loser
}) => {
    return (
        <GameOverContainer>
            { myTeam === winner ?
                <img src={victoryImg} alt={victoryImg}></img>
            : <img src={defeatImg} alt={defeatImg}></img> }
        </GameOverContainer>
    );
};

export default GameOver;
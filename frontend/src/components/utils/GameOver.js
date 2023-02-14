import defeatImg from "resources/images/defeat.png";
import victoryImg from "resources/images/victory2.png";

const GameOver = ({
    myTeam,
    winner,
    loser
}) => {
    return (
        <div>
            { myTeam === winner ?
                <img src={victoryImg}></img>
            : <img src={defeatImg}></img> }
        </div>
    );
};

export default GameOver;
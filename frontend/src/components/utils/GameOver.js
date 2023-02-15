import defeatImg from "resources/images/defeat.png";
import victoryImg from "resources/images/victory2.png";

import styled from "styled-components";

const GameOverContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    animation: bounce 0.5s ease infinite alternate;
    @keyframes bounce {
        100% {
          margin-top: -20px;
        }
`;

const ResultImgDiv = styled.img`
  position: relative;
`;

const WinFontDiv = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");
  font-family: "Kaushan Script", cursive;

  position: absolute;
  margin-top: 100px;

  font-size: 6rem;
  font-weight: bold;

  color: #f1ff78;
  text-shadow: -4px 0px black, 0px 4px black, 4px 0px black, 0px -4px black;
`;

const LoseFontDiv = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");
  font-family: "Kaushan Script", cursive;

  position: absolute;
  margin-top: 100px;

  font-size: 6rem;
  font-weight: bold;

  color: #c14a4a;
  text-shadow: -4px 0px black, 0px 4px black, 4px 0px black, 0px -4px black;
`;

const ExplanFontDiv = styled.p`
  position: absolute;
  margin-top: 250px;

  color: white;
  font-size: 20px;
  text-shadow: -2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black;
`;

const GameOver = ({ myTeam, winner, loser }) => {
  return (
    <>
      <GameOverContainer>
        {myTeam === winner ? (
          <>
            <ResultImgDiv src={victoryImg} alt={"승리"} />
            <WinFontDiv>WIN!</WinFontDiv>
            <ExplanFontDiv>
              당신은 동료들과 함께 무사히 지구에 도착했습니다.
            </ExplanFontDiv>
          </>
        ) : (
          <>
            <ResultImgDiv src={defeatImg} alt={"패배"} />
            <LoseFontDiv>LOSE..</LoseFontDiv>
            <ExplanFontDiv>
              당신은 외계인에게 붙잡히고 말았습니다..
            </ExplanFontDiv>
          </>
        )}
      </GameOverContainer>
    </>
  );
};

export default GameOver;

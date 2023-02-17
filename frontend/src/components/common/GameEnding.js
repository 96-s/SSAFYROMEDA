import victoryImg from "resources/images/victory.png";

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

const GameEnding = () => {
  return (
    <GameOverContainer>
      <ResultImgDiv src={victoryImg} alt={"승리"} />
      <WinFontDiv>GAME OVER!</WinFontDiv>
      <ExplanFontDiv>게임이 끝났습니다. 로비로 돌아갑니다..</ExplanFontDiv>
    </GameOverContainer>
  );
};

export default GameEnding;

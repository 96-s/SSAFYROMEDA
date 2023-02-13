import styled from "styled-components";

const H1Container = styled.h1`
  height: 100px;
`;

const SpanContainer = styled.div`
  position: relative;
  top: 20px;
  display: inline-block;
  animation: bounce 0.3s ease infinite alternate;
  font-size: 80px;
  color: #fff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
    0 5px 0 #ccc, 0 6px 0 transparent, 0 7px 0 transparent, 0 8px 0 transparent,
    0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);

  }
  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #CCC,
                   0 2px 0 #CCC,
                   0 3px 0 #CCC,
                   0 4px 0 #CCC,
                   0 5px 0 #CCC,
                   0 6px 0 #CCC,
                   0 7px 0 #CCC,
                   0 8px 0 #CCC,
                   0 9px 0 #CCC,
                   0 50px 25px rgba(0, 0, 0, .2);
    }
`;

const GameStartAnimation = () => {
  return (
    <div>
      <H1Container>
        <SpanContainer>
          <span>G</span>
          <span>A</span>
          <span>M</span>
          <span>E</span>
          <span>S</span>
          <span>T</span>
          <span>A</span>
          <span>R</span>
          <span>T</span>
          <span>!</span>
        </SpanContainer>
      </H1Container>
    </div>
  );
};

export default GameStartAnimation;

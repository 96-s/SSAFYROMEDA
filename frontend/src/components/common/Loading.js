import React from "react";
import styled from "styled-components";

const LoadingDiv = styled.div`
  font-size: 40px;
  color: black;

  text-shadow: -2px 0px white, 0px 2px white, 2px 0px white, 0px -2px white;

  animation: motion 1s linear 0s infinite alternate;
  @keyframes motion {
    100% {
      margin-top: -20px;
    }
  }
`;

const Loading = () => {
  return <LoadingDiv>준비 중..</LoadingDiv>;
};

export default Loading;

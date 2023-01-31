import styled from "styled-components";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//bootstrap css
import "nes.css/css/nes.min.css";

//IMAGE Components
import background from "resources/images/back.PNG";
import title from "resources/images/title.png";
import insertcoin from "resources/images/insert_coin.png";
import person from "resources/images/person.png";
import notperson from "resources/images/notperson.png";

///////////////////             BODY
const BG = styled.div`
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;

  ///////////////////             Input CSS

  .nes-radio:checked + span::before {
    top: 25px;
    left: -40px;
    width: 0;
    height: 0;
    border-bottom: 20px solid transparent;
    border-top: 20px solid transparent;
    border-left: 20px solid rgb(255, 94, 0);
    border-right: 20px solid transparent;
    box-shadow: none !important;
  }
`;
/*******************  HEADER *******************/

///////////////////             Title DIV

const Titlediv = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 40px;
`;
const Title = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: motion 0.3s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 80px;
    }

    100% {
      margin-top: 90px;
    }
  }
`;
///////////////////             InserCoin(section)
const Insertcoin = styled.img`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: motion 0.3s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 80px;
    }

    100% {
      margin-top: 90px;
    }
  }
`;
/*******************  SECTION *******************/

///////////////////             Section(Container)
const Container = styled.div`
  //   justify-content: space-between;
  //길이 임의 포지션에서 줄일 때
  // min-width: 1706px;
  width: 100vw;

  display: flex;
  position: relative;
  transform: translateY(35%);
  margin: auto;
`;

///////////////////             Section(Left)
const Leftdiv = styled.div`
  width: 100%;
  height: 100%;
`;
const Leftimg = styled.img``;

///////////////////             Section(Middle)
const MiddelDiv = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  margin: auto;
  text-align: center;
  font-size: 100px;
`;

///////////////////             Section(Right)
const RightDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Rightimg = styled.img`
  height: 498px;
  position: absolute;
  right: 0;
`;
const Span = styled.span`
  & > a:hover {
    color: #fff;
  }
  & > a {
    text-decoration: none;
  }
`;

///////////////////             Section(Input)
const Input = styled.input``;

///////////////////             Function
const MainPage = () => {
  const [inputStatus, setInputStatus] = useState(true);

  const handleClickRadioButton = () => {
    setInputStatus(inputStatus);
  };

  return (
    <>
      <BG>
        <Titlediv>
          <Title src={title} />
          <br />
          <br />
          <br />
          <Insertcoin src={insertcoin} />
        </Titlediv>
        <Container>
          <Leftdiv>
            <Leftimg src={person}></Leftimg>
          </Leftdiv>
          <MiddelDiv>
            <label>
              <Input
                type="radio"
                className="nes-radio"
                name="answer"
                checked={inputStatus}
                onChange={handleClickRadioButton}
              />

              <Span>
                <Link to="/signup">S T A R T</Link>
                <Link to="/signup">회원가입 하기</Link>
              </Span>
            </label>
          </MiddelDiv>
          <RightDiv>
            <Rightimg src={notperson}></Rightimg>
          </RightDiv>
        </Container>
      </BG>
    </>
  );
};
export default MainPage;

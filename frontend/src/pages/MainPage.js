import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
//bootstrap css
import "nes.css/css/nes.min.css";

//IMAGE Components
import background from "resources/images/back.PNG";
import title from "resources/images/title.png";
import insertcoin from "resources/images/insert_coin.png";
import person from "resources/images/person.png";
import notperson from "resources/images/notperson.png";

//=====================Main_Body
const BG = styled.div`  
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
`;

//=====================Title DIV

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
//=====================InserCoin(section)
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

//=====================Section(Container)
const Container = styled.div`
  // overflow:hidden;
  width: 100%;
  min-width: 1706px;
  display: flex;
  //   justify-content: space-between;
  bottom: -5px;
  position: absolute;
  bottom: 0px;
`;

//=====================Section(Left)
const Leftdiv = styled.div`
  width: 100%;
  height: 100%;
`;
const Leftimg = styled.img``;

//=====================Section(Middle)
const MiddelDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  font-size: 100px;
`;

//=====================Section(Right)
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
  color: ;
`;
//=====================Section(Input)

/////////////////////////////////////////////////////

const MainPage = () => {
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
              {/* <Input type="radio" className="nes-radio" name="answer" checked /> */}
              <input type="radio" className="nes-radio" name="answer" checked />

              <Span>
                <Link to="/lobby">S T A R T</Link>
              </Span>
            </label>

            {/* <Middelimg></Middelimg> */}
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

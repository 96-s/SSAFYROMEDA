//  CSS Styled
import styled from "styled-components";
import "nes.css/css/nes.min.css";
// REACT
import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";

//ROUTER
import { Link } from "react-router-dom";

//SLIDER LIBRARY

// Components
import { Context } from "store/audio";

//SLIDE LIBRARY

//IMAGE Components
import background from "resources/images/back.PNG";
import userimage from "resources/images/userimage.PNG";
import audioOn from "resources/images/ON.png";
import audioOff from "resources/images/OFF.png";
import logout from "resources/images/Logout.png";
import history from "resources/images/history.png";

///////////////////             BODY
const BG = styled.div`
  background: url(${background}) no-repeat center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
`;

/*******************  HEADER *******************/

///////////////////             HeadContainer DIV
const HeaderContainer = styled.div`
  height: 120px;
  padding: 1rem;
  color: white;

  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

///////////////////             HeadContainer DIV Left
const HeaderLeftDiv = styled.div`
  margin: 1px;
  height: 80px;
  width: 300px;
  background-color: #fafafa;
  color: black;
`;

const HeaderLeftUserImage = styled.img`
  height: 80px;
  width: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid black;
`;

const HeaderLeftUserInfo = styled.div`
  text-align: center;
  margin: 1px;
  height: 80px;
  width: 40px;
  line-height: 80px;
  font-size: 30px;
  background-color: #fafafa;
  color: black;
`;

///////////////////             HeadContainer DIV Right
const HeaderRightDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 70px;
  width: 150px;
  margin-left: auto;
  background-color: blue;
  opacity: 0.73;
  color: black;
`;
const HeaderRightSoundOn = styled.div`
  width: 75px;
  height: 50px;
  .audioImg {
    width: 50px;
    height: 50px;
  }
`;

const HeaderRightPlayOut = styled.div`
  left: 100%;
  width: 60px;
  height: 60px;
`;
const Img = styled.img`
  width: 60px;
  height: 60px;
`;
/*******************  MAIN *******************/

const Main = styled.main`
  float: left;
  margin-top: 40px;
  margin-left: 50px;
  background: lightgray;
  min-height: 550px;
  width: 900px;
`;

/******************* RIGHT SECTION *******************/
const Section = styled.section`
  margin-top: 0px;
  margin-right: 100px;
  background: none;
  min-height: 300px;
  width: 300px;
  float: right;

  text-align: center;
  img {
    min-height: 100px;
    /* height: 100px; */
    margin-top: 50px;
    width: 100px;
  }
  h1 {
    color: white;
    top: 120px;
  }
`;
const SectionUnderOne = styled.section`
  border: 1px solid white;
  margin-top: 0px;
  margin-right: 100px;
  background: none;
  min-height: 50px;
  width: 300px;
  float: right;
  text-align: center;
  padding: 5px 0px;
  font-size: 50px;
  color: white;
`;
const SectionUnderTwo = styled.section`
  border: 1px solid white;
  margin-top: 40px;
  margin-right: 100px;
  background: none;
  min-height: 50px;
  width: 300px;
  float: right;
  text-align: center;
  padding: 5px 0px;
  font-size: 50px;
  color: white;
`;

/*******************  FOOTER *******************/
const Footer = styled.footer``;

/*******************  SLIDER *******************/
const Wrapper = styled.div`
  width: 900px;
  height: 550px;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 900px;
  height: 550px;
`;

const SlideImg = styled.img`
  width: 900px;
  height: 550px;
`;
///////////////////             Function

const LobbyPage = () => {
  const { isPlay, setIsPlay } = useContext(Context);

  const onClickPlayMusicButton = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay, setIsPlay]);

  //slider setting
  const slideRef = useRef(null);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);
  const IMG_WIDTH = 900;
  const slideRange = currentImgOrder * IMG_WIDTH;

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${slideRange}px)`;
  }, [currentImgOrder]);

  const moveToNextSlide = () => {
    if (currentImgOrder === 2) return;
    setcCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setcCurrentImgOrder(currentImgOrder - 1);
  };

  return (
    <>
      <BG>
        <HeaderContainer>
          <HeaderLeftDiv>
            <HeaderLeftUserImage src={userimage}></HeaderLeftUserImage>
            &nbsp; 여기에는 닉네임과 전적
          </HeaderLeftDiv>
          <HeaderLeftUserInfo>I</HeaderLeftUserInfo>
          <HeaderRightDiv>
            <HeaderRightSoundOn>
              <button onClick={onClickPlayMusicButton}>
                {/* {isPlay ? "⏹" : "▶"} */}
                {isPlay ? (
                  <img src={audioOn} alt="Aon" className="audioImg"></img>
                ) : (
                  <img src={audioOff} alt="Aof" className="audioImg"></img>
                )}
              </button>
            </HeaderRightSoundOn>
            <HeaderRightPlayOut>
              <Link to="/">
                <Img src={logout} alt="out" classNmae="logout"></Img>
              </Link>
            </HeaderRightPlayOut>
          </HeaderRightDiv>
        </HeaderContainer>
        {/* STORY PAGE */}
        <Main>
          <Wrapper>
            <SlideWrapper ref={slideRef}>
              <SlideImg src={background} />
              <SlideImg src={audioOff} />
              <SlideImg src={audioOn} />
            </SlideWrapper>
          </Wrapper>
          <button onClick={moveToPrevSlide}>prev</button>
          <button onClick={moveToNextSlide}>next</button>
        </Main>

        <Section>
          <img src={history} alt="history" className="historys"></img>
          <h1>탈출 일지(예비)</h1>
        </Section>
        <SectionUnderOne>asdasd</SectionUnderOne>
        <SectionUnderTwo>asdasdas</SectionUnderTwo>
        <Footer></Footer>
      </BG>
    </>
  );
};
export default LobbyPage;

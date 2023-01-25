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
import { Link, useNavigate } from "react-router-dom";

//SLIDER LIBRARY

// Components
import { Context } from "store/audio";
import Modal from "components/display/Modal";
import MakeRoomModal from "components/display/MakeRoomModal";
import EnterRoomModal from "components/display/EnterRoomModal";

//SLIDE LIBRARY

//IMAGE Components
import background from "resources/images/back.PNG";
import userimage from "resources/images/userimage.PNG";
import audioOn from "resources/images/ON.png";
import audioOff from "resources/images/OFF.png";
import logout from "resources/images/Logout.png";
import history from "resources/images/history.png";
import prev from "resources/images/prev.png";
import next from "resources/images/next.png";

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
  margin: -5px;
  height: 84px;
  width: 40px;
  line-height: 78px;
  font-size: 30px;
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

const MainLeft = styled.main`
  float: left;
  margin-top: 2%;
  margin-left: 2%;
  background: lightgray;
  /* min-height: 75%; */
  width: 60%;
  height: 73%;
`;
const MainRight = styled.main`
  float: right;
  margin-top: 5%;
  margin-right: 5%;
  background: none;
  min-height: 65%;

  width: 30%;
`;

/******************* RIGHT SECTION *******************/
const Section = styled.section`
  margin-top: 0px;
  background: none;
  margin-left: auto;
  width: 40%;
  margin-right: auto;
  text-align: center;

  img {
    min-height: 50%;
    /* height: 100px; */
    margin-top: 50px;
    width: 50%;
  }
  h1 {
    color: white;
    top: 120px;
  }
`;
const SectionUnderOne = styled.section`
  border: 1px solid white;
  margin-top: 10%;
  margin: 10% auto;
  /* margin-right: 100%; */
  background: none;
  min-height: 50px;
  width: 60%;
  /* float: right; */
  text-align: center;
  padding: 1% 0px;
  font-size:20px;
  color: white;
`;
const SectionUnderTwo = styled.section`
  border: 1px solid white;
  margin-top: 10%;
  margin: 10% auto;
  /* margin-right: 100%; */
  background: none;
  min-height: 50px;
  width: 60%;
  /* float: right; */
  text-align: center;
  padding: 1% 0px;
  font-size: 20px;
  color: white;
`;

/*******************  FOOTER *******************/
const Footer = styled.footer``;

/*******************  SLIDER *******************/
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
`;
const SlideButton = styled.div`
  float: right;
  background-color: none;
  button {
    background: navajowhite;
  }
  img {
    height: 30px;
    width: 40px;
  }
`;

///////////////////             Function

const LobbyPage = () => {
  const { isPlay, setIsPlay } = useContext(Context);

  const onClickPlayMusicButton = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay, setIsPlay]);

  ///////////////////             slider setting
  const slideRef = useRef(null);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);
  const IMG_WIDTH = 100;
  const slideRange = currentImgOrder * IMG_WIDTH;

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${slideRange}%)`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImgOrder]);

  const moveToNextSlide = () => {
    if (currentImgOrder === 2) return;
    setcCurrentImgOrder(currentImgOrder + 1);
  };

  const moveToPrevSlide = () => {
    if (currentImgOrder === 0) return;
    setcCurrentImgOrder(currentImgOrder - 1);
  };

  const navigate = useNavigate();

  const onClickMoveProfilePage = () => {
    navigate('/profile');
  }
  ///////////////////             MODAL
  const [modalOpen, setModalOpen] = useState(false);

  const [MakeRoomModalOpen, setMakeRoomModalOpen] = useState(false);
  const [EnterRoomModalOpen, setEnterRoomModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openMakeRoomModal = () => {
    setMakeRoomModalOpen(true);
  };
  const closeMakeRoomModal = () => {
    setMakeRoomModalOpen(false);
  };

  const openEnterRoomModal = () => {
    setEnterRoomModalOpen(true);
  };
  const closeEnterRoomModal = () => {
    setEnterRoomModalOpen(false);
  };

  return (
    <>
      <BG>
        <HeaderContainer>
          <HeaderLeftDiv
            onClick={() => {
              onClickMoveProfilePage();
            }}
          >
            <HeaderLeftUserImage src={userimage}></HeaderLeftUserImage>
            &nbsp; 여기에는 닉네임과 전적
          </HeaderLeftDiv>
          <HeaderLeftUserInfo>
            <button onClick={openModal}>I</button>
            {/* //header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="Modal heading">
              {/* <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 */}
              모달 창 나의 정보를 입력해보자잇!!!!!!!!!!!!!
            </Modal>
          </HeaderLeftUserInfo>
          <HeaderRightDiv>
            <HeaderRightSoundOn>
              <button onClick={onClickPlayMusicButton}>
                {isPlay ? (
                  <img src={audioOn} alt="Aon" className="audioImg"></img>
                ) : (
                  <img src={audioOff} alt="Aof" className="audioImg"></img>
                )}
              </button>
            </HeaderRightSoundOn>
            <HeaderRightPlayOut>
              <Link to="/">
                <Img src={logout} alt="out" className="logout"></Img>
              </Link>
            </HeaderRightPlayOut>
          </HeaderRightDiv>
        </HeaderContainer>
        {/* STORY PAGE */}
        <MainLeft>
          <Wrapper>
            <SlideWrapper ref={slideRef}>
              <SlideImg src={background} />
              <SlideImg src={background} />
              <SlideImg src={background} />
            </SlideWrapper>
          </Wrapper>
          <SlideButton>
            <button onClick={moveToPrevSlide}>
              <img src={prev} alt="prev" className="prev" />
            </button>
            <button onClick={moveToNextSlide}>
              <img src={next} alt="next" className="next" />
            </button>
          </SlideButton>
        </MainLeft>
        <MainRight>
          <Section>
            <img src={history} alt="history" className="historys"></img>
            <h1>탈출 일지(예비)</h1>
          </Section>
          {/* 여기다가 우주선 탑승, 생성 에 관련된 링크 달면돼 */}
          <SectionUnderOne>
            <span onClick={openMakeRoomModal}>우주선 생성</span>
            {/* //header 부분에 텍스트를 입력한다. */}
            <MakeRoomModal
              open={MakeRoomModalOpen}
              close={closeMakeRoomModal}
              header="우주선 생성"
            >
              임시
            </MakeRoomModal>
          </SectionUnderOne>
          <SectionUnderTwo>
            <span onClick={openEnterRoomModal}>우주선 탑승</span>
            <EnterRoomModal
              open={EnterRoomModalOpen}
              close={closeEnterRoomModal}
              header="우주선 탑승"
            >
              임시
            </EnterRoomModal>
          </SectionUnderTwo>
        </MainRight>

        <Footer></Footer>
      </BG>
    </>
  );
};
export default LobbyPage;

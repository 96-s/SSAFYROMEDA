import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthSlice";

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

//Music
import MusicContainer from "../store/audio";
import Sound from "components/common/sound.js";

// Components
import { Context } from "store/audio";
import Modal from "components/display/Modal";
import MakeRoomModal from "components/display/MakeRoomModal";
import EnterRoomModal from "components/display/EnterRoomModal";
import Logout from "components/common/Logout";
import MyButton from "components/common/Button";

//SLIDE LIBRARY

//IMAGE Components
import background from "resources/images/lobby_background3.png";
import userimage from "resources/images/userimage.PNG";
import history from "resources/images/history.png";
import prev from "resources/images/prev.png";
import next from "resources/images/next.png";
import sdon from "resources/images/soundon_icon.png";
import sdoff from "resources/images/soundoff_icon.png";
import astronaut from "resources/images/astronaut2.png";
// import logout from "resources/images/logout_icon.png";

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

const MyPageBalloon = styled.div`
  animation: motion 1s linear 0s infinite alternate;

  @keyframes motion {
    0% {
      margin-top: 60px;
    }

    100% {
      margin-top: 90px;
    }
  }
`;

const AustronautImg = styled.img`
  animation: motion 1s linear 0s infinite alternate;
  @keyframes motion {
    0% {
      margin-top: 60px;
    }

    100% {
      margin-top: 90px;
    }
  }
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
  margin-top: 170px;
  margin-left: 100px;

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
  // background-color: blue;
  opacity: 0.73;
  color: black;
`;

const HeaderRightSoundOn = styled.div`
  .audioImg {
    width: 60px;
    height: 60px;
  }
`;

const HeaderRightPlayOut = styled.div`
  left: 100%;
  width: 60px;
  height: 60px;
`;
// const Img = styled.img`
//   width: 60px;
//   height: 60px;
// `;
/*******************  MAIN *******************/

const MainLeft = styled.main`
  float: left;
  margin-top: 50px;
  margin-left: 200px;
`;
const MainRight = styled.main`
  float: right;
  margin-top: 20px;
  margin-right: 120px;
  background: none;
  min-height: 65%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 30%;
`;

/******************* RIGHT SECTION *******************/
const TitleText = styled.h1`
  font-size: 2.5rem;
  color: white;

  margin-bottom: 10px;
`;

const ButtonBox = styled.div`
  width: 350px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 2px solid #dcdcdc;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
  .MyButton:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
  .MakeRoomModal:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
`;

const SectionUnderTwo = styled.section`
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
  .MyButton:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
  .EnterRoomModal:hover {
    transform: scale(1.2);
    transition: 0.5s;
  }
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
  const dispatch = useDispatch();

  //토큰 테스트
  const temp = localStorage.getItem("persist:root");
  let token = "";

  if (temp) {
    const temp2 = JSON.parse(temp);
    const temp3 = JSON.parse(temp2.auth);
    token = temp3.token;
  }
  console.log("지금 토큰은?: ", token);

  const { isPlay, setIsPlay } = useContext(Context);

  const { userNo, userNickname } = useSelector((state) => ({
    userNo: state.auth.user?.userNo,
    userNickname: state.auth.user?.userNickname,
  }));

  const onClickPlayMusicButton = useCallback(() => {
    setIsPlay(!isPlay);
  }, [isPlay, setIsPlay]);

  ///////////////////           게임방 생성 요청
  const createGameRoomHandle = () => {
    const user = { userNo, userNickname };
    dispatch(authActions.createGameRoomStart(user));
    console.log("방 생성 요청 액션 시작!");
  };
  ///////////////////           게임방 입장 요청
  const joinGameRoomHandle = () => {
    const user = { userNo, userNickname };
    const roomCode = 0;
    dispatch(authActions.joinGameRoomStart({ roomCode, user }));
  };

  ///////////////////             slider setting
  const slideRef = useRef(null);
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);
  const IMG_WIDTH = 100;
  const slideRange = currentImgOrder * IMG_WIDTH;

  // useEffect(() => {
  //   slideRef.current.style.transition = "all 0.5s ease-in-out";
  //   slideRef.current.style.transform = `translateX(-${slideRange}%)`;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentImgOrder]);

  // const moveToNextSlide = () => {
  //   if (currentImgOrder === 2) return;
  //   setcCurrentImgOrder(currentImgOrder + 1);
  // };

  // const moveToPrevSlide = () => {
  //   if (currentImgOrder === 0) return;
  //   setcCurrentImgOrder(currentImgOrder - 1);
  // };

  const navigate = useNavigate();

  const onClickMoveProfilePage = () => {
    navigate("/profile");
  };
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
          <HeaderLeftUserInfo>
            <MyPageBalloon
              className="nes-balloon from-right nes-pointer"
              onClick={openModal}
            >
              <span>나의 탈출일지</span>
            </MyPageBalloon>
            {/* //header 부분에 텍스트를 입력한다. */}
            <Modal
              className="nes-dialog is-rounded"
              open={modalOpen}
              close={closeModal}
              header="Modal heading"
            >
              {/* <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 */}
              모달 창 나의 정보를 입력해보자잇!!!!!!!!!!!!!
            </Modal>
          </HeaderLeftUserInfo>
          <HeaderRightDiv>
            <MusicContainer>
              <Sound />
            </MusicContainer>
            <HeaderRightPlayOut>
              <Logout />
            </HeaderRightPlayOut>
          </HeaderRightDiv>
        </HeaderContainer>
        {/* STORY PAGE */}
        <MainLeft>
          <AustronautImg src={astronaut} />
        </MainLeft>

        <MainRight>
          <TitleText>게임 시작하기</TitleText>

          {/* 여기다가 우주선 탑승, 생성 에 관련된 링크 달면돼 */}
          <ButtonBox>
            <SectionUnderOne>
              <MyButton
                lang={"Korean"}
                text={"　우주선 생성　"}
                onClick={() => {
                  createGameRoomHandle();
                  openMakeRoomModal();
                }}
              />
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
              <MyButton
                lang={"Korean"}
                text={"　우주선 탑승　"}
                type={"is-warning"}
                onClick={openEnterRoomModal}
              />
              <EnterRoomModal
                open={EnterRoomModalOpen}
                close={closeEnterRoomModal}
                header="우주선 탑승"
              >
                임시
              </EnterRoomModal>
            </SectionUnderTwo>
          </ButtonBox>
        </MainRight>

        <Footer></Footer>
      </BG>
    </>
  );
};
export default LobbyPage;

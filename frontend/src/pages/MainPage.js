import MyButton from "../components/common/button";

const MainPage = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <div>
        <h3>버튼 테스트</h3>
        <MyButton type={"English"} text={"START"} onClick={() => {}} />
        <MyButton
          type={"Korean"}
          text={"제발폰트적용좀요"}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default MainPage;

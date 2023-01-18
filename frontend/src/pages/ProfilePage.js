import MyButton from "../components/common/Button";
import Header from "../components/common/Header";
import MyHistory from "../components/personal/MyHistory";
import MyInfo from "../components/personal/MyInfo";
import MyPhoto from "../components/personal/MyPhoto";

import "./ProfilePage.css";


const ProfilePage = () => {
  return (
    <>
      <h1>ProfilePage</h1>
      <div className="all">
        <Header/>
        <div className="profile">
          <div className="MyHistory">
            <MyHistory/>
          </div>
          <div className="myinfo">
            <MyInfo/>
            <MyButton
                type={"Korean"}
                text={"수정"}
                onClick={() => {}}
              />
          </div>
        </div>
        <MyPhoto/>
      </div>
    </>
  );
};

export default ProfilePage;

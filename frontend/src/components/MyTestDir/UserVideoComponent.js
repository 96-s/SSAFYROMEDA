import React, { useEffect, useState } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// import './UserVideo.css';

const StreamComponent = styled.div`
    display: flex;
    // height: 300px;
    // aspect-ratio: 4 / 3;
`;

const Nickname = styled.div`
    color: white;
    text-align: center;
`;

const  UserVideoComponent =  ({streamManager}) => {

    const [userNickname, setUserNickname] = useState("");
    console.warn(streamManager);
    const getNicknameTag = (streamManager) => {
      // console.warn("안녕", streamManager.stream);
      const nickname = JSON.parse(
        streamManager.stream.connection.data
      ).clientData;
      // console.warn("안녕닉네임", nickname);
      setUserNickname(nickname);
    };
  
    useEffect(() => {
      getNicknameTag(streamManager);    
    }, []);

    return (
        <div>
            {streamManager !== undefined ? (
                <StreamComponent>
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={streamManager} />
                        {/* <Nickname><p>{this.getNicknameTag()}</p></Nickname> */}
                        <Nickname><p>{userNickname}</p></Nickname>
                    </div>
                </StreamComponent>
            ) : null}
        </div>
    );

}

export default UserVideoComponent;

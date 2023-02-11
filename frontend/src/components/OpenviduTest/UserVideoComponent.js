import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import OpenViduVideoComponent from './OvVideo';
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

const  UserVideoComponent =  ({streamManager, userNickname, userNo}) => {

    return (
        <div>
            {streamManager !== undefined ? (
                <StreamComponent>
                    <div className="streamcomponent">
                        <OpenViduVideoComponent 
                            streamManager={streamManager}
                        />
                        <Nickname><p>{userNickname}</p></Nickname>
                    </div>
                </StreamComponent>
            ) : null}
        </div>
    );

}

export default UserVideoComponent;

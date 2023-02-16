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

const  UserVideoComponent =  ({streamManager}) => {
    
    useEffect(() => {console.log(streamManager)}, [streamManager]);

    return (
        <div>
            {streamManager !== undefined ? (
                <StreamComponent>
                    <div className="streamcomponent">
                        <OpenViduVideoComponent 
                            streamManager={streamManager}
                        />
                        <Nickname><p>{JSON.parse(streamManager.stream.connection.data).clientData}</p></Nickname>
                        <br></br>
                    </div>
                </StreamComponent>
            ) : null}
        </div>
    );

}

export default UserVideoComponent;

import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
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

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <StreamComponent>
                        <div className="streamcomponent">
                            <OpenViduVideoComponent streamManager={this.props.streamManager} />
                            <Nickname><p>{this.getNicknameTag()}</p></Nickname>
                        </div>
                    </StreamComponent>
                ) : null}
            </div>
        );
    }
}

import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from 'styled-components';
// import './UserVideo.css';

const StreamComponent = styled.div`
    height: 25vh;
    aspect-ratio: 4 / 3;
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
                            <div><p>{this.getNicknameTag()}</p></div>
                        </div>
                    </StreamComponent>
                ) : null}
            </div>
        );
    }
}

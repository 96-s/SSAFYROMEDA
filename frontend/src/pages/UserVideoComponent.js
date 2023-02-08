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

const UserVideoComponent = (props) => {
    console.log(props);

    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(props.streamManager.stream.connection.data).clientData;
    }

    return(
        <div>
            {props.streamManager !== undefined ? (
                <StreamComponent>
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={props.streamManager} />
                        <Nickname><p>{getNicknameTag()}</p></Nickname>
                    </div>
                </StreamComponent>
            ) : null}
        </div>
    );
}
export default UserVideoComponent;

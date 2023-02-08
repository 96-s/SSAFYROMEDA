import React from 'react';

const OpenViduVideoComponent = (props) => {
    
    const videoRef=React.createRef();// HTML video 요소를 가져옴

    const componentDidUpdate = () => {
        if (props && !!videoRef) {
            props.streamManager.addVideoElement(videoRef.current);
        }
    }

    const componentDidMount = () => {
        if (props && !!this.videoRef) {
            // 컴포넌트 랜더링 후, HTML video 요소를 한번 수신함
            props.streamManager.addVideoElement(videoRef.current);
        }
    }
    
    return(
         <video autoPlay={true} ref={videoRef} />
    );
}
export default OpenViduVideoComponent;

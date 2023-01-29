import styled from "styled-components";
import Timer from "components/common/Timer";

import MapIMG from "resources/images/Map/MapIMG.gif";
import Marker1IMG from "resources/images/Map/marker1.png";
import Marker2IMG from "resources/images/Map/marker2.png";

const Page = styled.div`
    display: flex;
    justify-content: center;

`;

const Board = styled.div`
    display: flex;
    justify-content: center;
    margin auto;
    border: 1px solid black;
    aspect-ratio: 1 / 1;
    height: 85vh;
    background: url(${MapIMG}) no-repeat;
    background-size: 100%;
    color: white;
`;

const Marker1 = styled.section`
    img {
        width: 50px;
        position: relative;
        top: 20px;
        left: -265px;
    }
`;
const Marker2 = styled.section`
    img {
        width: 50px;
        position: relative;
        top: 20px;
        left: -280px;
    }
`;






const Map = () => {
    return(
        <Page>
            <Board>
                <Timer mm="1" ss="9"/>
                <Marker1>
                    <img src={Marker1IMG} alt="marker1"></img>
                </Marker1>
                <Marker2>
                    <img src={Marker2IMG} alt="marker2"></img>
                </Marker2>
            </Board>
        </Page>
    )
};

export default Map;
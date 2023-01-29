import styled from "styled-components";
import Timer from "components/common/Timer";

import MapIMG from "resources/images/Map/MapIMG.jpg";
import Chance1 from "resources/images/Map/Chance1.gif";
import Chance2 from "resources/images/Map/Chance2.gif";
import Chance3 from "resources/images/Map/Chance3.gif";
import Chance4 from "resources/images/Map/Chance4.gif";
import Chance5 from "resources/images/Map/Chance5.gif";
import Start from "resources/images/Map/start.gif";

const Page = styled.div`
    display: flex;
    justify-content: center;

`

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

const Map = () => {
    return(
        <Page>
            <Board>
                <Timer mm="1" ss="9"/>
                <img src={Start} alt="Start"></img>
            </Board>
        </Page>
    )
};

export default Map;
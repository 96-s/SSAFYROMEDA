import styled from "styled-components";
import Timer from "components/common/Timer";

import MapIMG from "resources/images/Map/MapIMG.gif";

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





const Map = () => {
    return(
        <Page>
            <Board>
                <Timer mm="1" ss="9"/>
            </Board>
        </Page>
    )
};

export default Map;
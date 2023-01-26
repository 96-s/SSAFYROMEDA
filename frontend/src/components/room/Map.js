import styled from "styled-components";
import MapIMG from "resources/images/MapIMG.png";
import Timer from "components/common/Timer";

const Board = styled.div`
    margin: auto 0px;
    border: 1px solid black;
    width: 750px;
    height: 750px;
    background: url(${MapIMG}) no-repeat;
    background-size: 100%;
    color: white;
`;

const Map = () => {
    return(
        <div className="container">
            <Board>
                <Timer mm="1" ss="9"/>
            </Board>
        </div>
    )
};

export default Map;
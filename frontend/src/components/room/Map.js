import styled from "styled-components";
import MapIMG from "resources/images/MapIMG.png";

const Board = styled.div`
    margin: auto 0px;
    border: 1px solid black;
    width: 750px;
    height: 750px;
    background: url(${MapIMG}) no-repeat;
    background-size: 100%;
`;

const Map = () => {
    return(
        <div className="container">
            <Board>
                냠
            </Board>
        </div>
    )
};

export default Map;
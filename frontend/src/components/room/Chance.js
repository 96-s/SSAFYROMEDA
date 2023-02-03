import styled from 'styled-components';
import { chanceCardList } from './ChanceCardList';

const CardDiv = styled.div`
    display: flex;
    margin: auto;
    justify-content: center;
    color: black;
    width: 200px;
    flex-wrap: nowrap;
`;

const CardTitleDiv = styled.div`
    font-size: 20px;
    display: flex;
    white-space: normal;
    margin: 5px;
`;

const CardContentDiv = styled.div`

`

const Chance = (
    props
    ) => {

    // for (const key in Object.keys(chanceCardList)) {
    //     console.log(chanceCardList[key].title);
    // }
    

    return (
        <CardDiv>
            <CardTitleDiv>
                {chanceCardList[props.chanceNum].title}
            </CardTitleDiv>
            <CardContentDiv>
                {chanceCardList[props.chanceNum].content}
            </CardContentDiv>
        </CardDiv>
    );
};

export default Chance;
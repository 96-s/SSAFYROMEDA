import styled from 'styled-components';
import { chanceCardList } from './ChanceCardList';

const CardDiv = styled.div`
    display: flex;
    margin: auto;
    justify-content: center;
    color: black;
    width: 200px;
`

const Chance = () => {

    for (const key in Object.keys(chanceCardList)) {
        console.log(chanceCardList[key].title);
    }
      
    return (
        <CardDiv>
            <span>{chanceCardList[1].title}</span>
            <span>{chanceCardList[1].content}</span>
        </CardDiv>
    );
};

export default Chance;
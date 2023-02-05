import styled from "styled-components";

const Page = styled.div`
    margin: auto;
`;


const Quiz = () => {
    return (
      <Page>
        <div className="nes-balloon from-left is-dark">
            <p>내 이름은 무엇일까요?</p>
        </div>
      </Page>
    );
}

export default Quiz;
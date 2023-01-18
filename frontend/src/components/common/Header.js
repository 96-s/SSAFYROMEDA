import { Link } from 'react-router-dom';
import styled from "styled-components";
import "./Header.css";
// import "/path/to/pixel-borders.scss";

const HeaderDiv = styled.div`  
    z-index: 6;
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 5vh;
    background-color: skyblue;
`;

const Header = () => {
    // const navigate = useNavigate();
    const nickname = '임시닉네임'
    return (
        <>
            <HeaderDiv>

                <div className="pixel-borders--2-inset">
                    <Link to={'/profile'}>{nickname}</Link>
                </div>
            </HeaderDiv>
        </>
    );
};

export default Header;
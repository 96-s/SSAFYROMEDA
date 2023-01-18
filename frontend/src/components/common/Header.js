import { Link } from 'react-router-dom';
import styled from "styled-components";
import "./PixelBorder.css";
// import "/path/to/pixel-borders.scss";

const HeaderDiv = styled.div`  
    z-index: 6;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
    padding: 0 5%;
    height: 5vh;
    background-color: skyblue;
`;

const Header = () => {
    // const navigate = useNavigate();
    const nickname = '임시닉네임'
    return (
        <>
            <div className="pixel-box--primary">
                <HeaderDiv>
                    <div>
                        <Link to={'/profile'}>{nickname}</Link>
                    </div>
                    <span>전적 0승 0패</span>
                </HeaderDiv>
            </div>
        </>
    );
};

export default Header;
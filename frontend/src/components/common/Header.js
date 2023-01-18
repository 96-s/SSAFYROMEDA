import { useNavigate } from 'react-router-dom';
import "./Header.css";
// import "/path/to/pixel-borders.scss";

const Header = () => {
    const navigate = useNavigate();
    const nickname = '임시닉네임'
    return (
        <div className="headerBlock">
            <div className="pixel-borders pixel-borders--custom">
                <span onClick={() => navigate('/profile')}>{nickname}</span>
            </div>
        </div>
    );
};

export default Header;
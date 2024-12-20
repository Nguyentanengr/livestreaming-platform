import { Link } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import { LeftHeaderContainer } from "./LeftHeader.styled";


const LeftHeader = () => {
    return (
        <LeftHeaderContainer>
            <Link to="/">
                <div className="logo-container">
                    <div className="logo">
                        <div className="logo-bg"></div>
                        <Icons.TwitchLogo />
                    </div>
                    <div className="logo-text">Twitch</div>
                </div>
            </Link>
        </LeftHeaderContainer>
    )
};

export default LeftHeader;
import { HeaderContainer } from "./Header.styled";
import LeftHeader from "./LeftHeader";
import MiddleHeader from "./MiddleHeader";
import RightHeader from "./RightHeader";

const Header = ({ unvisibleSearch=false }) => {
    return (
        <HeaderContainer>
            <LeftHeader />
            <MiddleHeader unvisibleSearch={unvisibleSearch} />
            <RightHeader /> 
        </HeaderContainer>
    )
}

export default Header;

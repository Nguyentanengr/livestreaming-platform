import { HeaderContainer } from "./Header.styled";
import LeftHeader from "./LeftHeader";
import MiddleHeader from "./MiddleHeader";
import RightHeader from "./RightHeader";

const Header = () => {
    return (
        <HeaderContainer>
            <LeftHeader />
            <MiddleHeader />
            <RightHeader /> 
        </HeaderContainer>
    )
}

export default Header;

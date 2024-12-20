import { MiddleHeaderContainer } from "./MiddleHeader.styled";
import { Icons } from "../../../assets/icons/Icon";
const MiddleHeader = () => {
    return (
        <MiddleHeaderContainer>
            <div className="search-container">
                <input type="text" placeholder="Search" />
                <div className="search-icon">
                    <Icons.SearchIcon />
                </div>
            </div>
        </MiddleHeaderContainer>
    )
};

export default MiddleHeader;
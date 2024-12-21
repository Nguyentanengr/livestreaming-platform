import { MiddleHeaderContainer } from "./MiddleHeader.styled";
import { Icons } from "../../../assets/icons/Icon";
const MiddleHeader = () => {

    const search = () => {
        console.log("searching");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    return (
        <MiddleHeaderContainer>
            <div className="search-container">
                <input type="text" spellCheck={false} placeholder="Search" onKeyDown={(e) => {handleKeyDown(e)}}/>
                <div className="search-icon" onClick={() => search()}>
                    <Icons.SearchIcon />
                </div>
            </div>
        </MiddleHeaderContainer>
    );
};

export default MiddleHeader;
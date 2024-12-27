
import { ShowMoreContainer } from "./ShowMore.styled";
import { Icons } from "../../assets/icons/Icon";

const ShowMore = ({ title, onclick}) => {
    return (
        <ShowMoreContainer>
            <div className="show-more-container" onClick={onclick}>
                {title == "Show More" && <span>{title} <Icons.ShowMore className="show-more-icon"/></span>}
                {title == "Show Less" && <span>{title} <Icons.ShowLess className="show-more-icon"/></span>}
            </div>
        </ShowMoreContainer>
    )
}

export default ShowMore;    

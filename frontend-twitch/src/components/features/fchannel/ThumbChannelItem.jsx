import { useNavigate } from "react-router-dom";
import { ThumbChannelItemContainer } from "./ThumbChannelItem.styled"
import Thumbnail from "../../commons/Thumbnail";


const ThumbChannelItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <ThumbChannelItemContainer>
            <div className="thumb-container">
                <div className={`thumb-border ${item.isLive ? "highlight" : "unhighlight"}`}>
                    <Thumbnail src={item.thumbnail} size={"vvlarge"} onclick={() => navigate(`/profile/${item.username}`)}/>
                </div>
                {item.isLive && <div className="span-live">Live</div>}
            </div>
            <div className="username">
                {item.username}
            </div>
        </ThumbChannelItemContainer>
    );
};

export default ThumbChannelItem;

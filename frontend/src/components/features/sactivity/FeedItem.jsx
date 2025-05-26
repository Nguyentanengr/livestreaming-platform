

import { FeedItemContainer } from "./FeedItem.styled";
import { Icons } from "../../../assets/icons/Icon";
import ActionButton from "../../commons/ActionButton";

const FeedItem = ({ feed }) => {
    return (
        <FeedItemContainer>
            <div className="feed-icon">
                <Icons.HeartFill />
            </div>
            <div className="content">
                <div className="username">{feed.user}</div>
                <div className="description">
                    <div className="text">
                        {
                            feed.type == "followed" ? "Followed You" :
                            feed.type == "gift" ? "Gave you a gift" :
                            ""
                        }
                    </div>
                    <Icons.HotLive className="dot-icon"/>
                    <div className="time">
                        {feed.timestamp}
                    </div>
                </div>
            </div>
            {/* <ActionButton icon={<Icons.More />} /> */}
        </FeedItemContainer>
    );
};

export default FeedItem;
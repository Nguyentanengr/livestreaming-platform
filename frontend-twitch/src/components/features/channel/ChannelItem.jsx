
import { ChannelItemContainer } from "./ChannelItem.styled";
import { Icons } from "../../../assets/icons/Icon";

const ChannelItem = ({ live }) => {
    return (
        <ChannelItemContainer>
            <div className="thumbnail-container">
                <img src={live.thumbnail} alt={live.title} />
                <div className="live-status">LIVE</div>
                <div className="viewers-count">{live.views} viewers</div>
            </div>
            <div className="description-container">
                <div className="info-container">
                    <div className="avatar">
                        <img src={live.avatar} alt={live.username} />
                    </div>
                    <div className="profile-info">
                        <div className="title">{live.title}</div>
                        <div className="username">{live.username}</div>
                        <div className="tags">
                            {live.tags.map((tag) => {
                                return <div className="tag" key={tag.id}>{tag.tag}</div>;
                            })}
                        </div>
                    </div>
                </div>
                <div className="option">
                    <Icons.More />
                </div>
            </div>
        </ChannelItemContainer>
    );
};

export default ChannelItem;

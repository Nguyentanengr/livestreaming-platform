
import { ChannelItemContainer } from "./ChannelItem.styled";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import { convertDuration, convertView, convertTimeAgo } from "../../../utils/convert";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "../../commons/ActionButton";


const ChannelItem = ({ item, type }) => {
    const navigate = useNavigate();
    return (
        <ChannelItemContainer>
            <div className="thumbnail-container">
                <img src={item.thumbnail} alt={item.title} />
                {type === "live" &&<div className="live-status">LIVE</div>}
                {type === "live" && <div className="viewers-count">{item.views} viewers</div>}
                {type === "video" && <div className="duration">{convertDuration(item.duration)}</div>}
            </div>
            <div className="description-container">
                <div className="info-container">
                    <Thumbnail src={item.avatar} onclick={() => navigate("/my-channel")} />
                    <div className="profile-info">
                        <div className="title">{item.title}</div>
                        <div className="username">{item.username}</div>
                        {type === "live" && <div className="tags">
                            {item.tags.map((tag) => {
                                return <div className="tag" key={tag.id}>{tag.tag}</div>;
                            })}
                        </div>}
                        {type === "video" && <div className="view-time">
                            <div className="viewers">{convertView(item.views)} views</div>
                            <Icons.HotLive className="icon"/>
                            <div className="time-age">{convertTimeAgo(item.createdAt)}</div>
                        </div>}
                    </div>
                </div>
                <div className="option">
                    <ActionButton icon={<Icons.More />} onclick={() => {}} tooltip="Options" />
                </div>
            </div>
        </ChannelItemContainer>
    );
};

export default ChannelItem;

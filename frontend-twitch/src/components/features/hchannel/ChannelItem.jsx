import { ChannelItemContainer } from "./ChannelItem.styled";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import { convertDuration, convertView, convertTimeAgo, convertTimeToTimeAgo } from "../../../utils/convert";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "../../commons/ActionButton";

const ChannelItem = ({ item, type }) => {
    const navigate = useNavigate();

    const handleOnClickItem = () => {
        navigate(`/live/${item.username}?streamId=${item.id}`);
    };

    const handleAvatarClick = (username) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === username) {
            navigate('/you')
        } else {
            navigate(`/channel/${username}`);
        }
    }

    return (
        <ChannelItemContainer >
            <div className="thumbnail-container" onClick={handleOnClickItem}>
                <img src={item.thumbnail} alt={item.title} />
                {type === "live" && <div className="live-status">LIVE</div>}
                {type === "live" && <div className="viewers-count">{convertView(item.views)} viewers</div>}
                {type === "video" && <div className="duration">{convertDuration(item.duration)}</div>}
            </div>
            <div className="description-container">
                <div className="info-container">
                    <Thumbnail src={item.avatar} onclick={() => handleAvatarClick(item.username)} />
                    <div className="profile-info">
                        <div className="title">{item.title}</div>
                        <div className="username">{item.username}</div>
                        {type === "live" && (
                            <div className="tags">
                                {item.tags.map((tag) => (
                                    <div className="tag" key={tag.id}>{tag.tag}</div>
                                ))}
                            </div>
                        )}
                        {type === "video" && (
                            <div className="view-time">
                                <div className="viewers">{convertView(item.views)} views</div>
                                <Icons.HotLive className="icon" />
                                <div className="time-age">{convertTimeToTimeAgo(item.createdAt)}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="option">
                    <ActionButton icon={<Icons.More />} onClick={() => {}} tooltip="Options" />
                </div>
            </div>
        </ChannelItemContainer>
    );
};

export default ChannelItem;
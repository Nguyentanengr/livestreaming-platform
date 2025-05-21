
import { StreamItemContainer } from "./StreamItem.styled";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import { convertDuration, convertView, convertTimeAgo } from "../../../utils/convert";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "../../commons/ActionButton";


const StreamItem = ({ item }) => {
    const navigate = useNavigate();

    const handleOnClickItem = () => {
        navigate(`/live/${item.username}`);
    }
    return (
        <StreamItemContainer onClick={handleOnClickItem}>
            <div className="thumbnail-container">
                <img src={item.thumbnail} alt={item.title} />
                {/* <div className="duration">{convertDuration(item.duration)}</div> */}
            </div>
            <div className="description-container">
                <div className="info-container">
                    <div className="profile-info">
                        <div className="title">{item.title}</div>
                        <div className="view-time">
                            <div className="viewers">{convertView(item.viewersCount)} views</div>
                            <Icons.HotLive className="icon" />
                            <div className="time-age">2 hour ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </StreamItemContainer>
    );
};

export default StreamItem;

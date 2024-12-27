
import { ChannelItemContainer } from "./ChannelItem.styled";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "../../commons/ActionButton";

const ChannelItem = ({ live }) => {
    const navigate = useNavigate();
    return (
        <ChannelItemContainer>
            <div className="thumbnail-container">
                <img src={live.thumbnail} alt={live.title} />
                <div className="live-status">LIVE</div>
                <div className="viewers-count">{live.views} viewers</div>
            </div>
            <div className="description-container">
                <div className="info-container">
                    <Thumbnail src={live.avatar} onclick={() => navigate("/my-channel")} />
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
                    <ActionButton icon={<Icons.More />} onclick={() => {}} tooltip="Options" />
                </div>
            </div>
        </ChannelItemContainer>
    );
};

export default ChannelItem;

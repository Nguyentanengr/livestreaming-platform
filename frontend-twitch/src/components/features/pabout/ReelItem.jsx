
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon";
import { convertDuration, convertView, convertTimeAgo } from "../../../utils/convert";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "../../commons/ActionButton";
import { ReelItemContainer } from "./ReelItem.styled";


const ReelItem = ({ item }) => {
    const navigate = useNavigate();

    const handleOnClickItem = () => {
        navigate(`/live/${item.username}`);
    }
    return (
        <ReelItemContainer onClick={handleOnClickItem}>
            <div className="thumbnail-container">
                <img src={item.thumbnail} alt={item.title} />
                <div className="like-count-container">
                    <Icons.HeartFill className="like-icon" />
                    <div className="like-count">{convertView(item.likesCount)}</div>
                </div>
            </div>
           
        </ReelItemContainer>
    );
};

export default ReelItem;

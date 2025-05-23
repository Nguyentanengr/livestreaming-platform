import { useNavigate } from "react-router-dom";
import { ReelItemContainer } from "./ReelItem.styled";

const ReelItem = ({ item }) => {
    const navigate = useNavigate();

    // Xử lý khi nhấn vào reel để xem video
    const handleOnClickItem = () => {
        // Chuyển hướng đến trang xem video, truyền URL video qua query parameter
        navigate(`/reel/${item.id}?videoUrl=${encodeURIComponent(item.video)}`);
    };

    return (
        <ReelItemContainer onClick={handleOnClickItem}>
            <div className="thumbnail-container">
                <img src={item.thumbnail} alt={item.description || "Reel"} />
            </div>
        </ReelItemContainer>
    );
};

export default ReelItem;
import { CategoryItemContainer } from "./CategoryItem.styled";
import { convertView } from "../../../utils/convert";
import { Icons} from "../../../assets/icons/Icon";
import ActionButton from "../../commons/ActionButton";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ item }) => {
    const navigate = useNavigate();

    const handleClickThumbnail = () => {
        console.log('thumbnail');
        navigate(`/categories/${item.id}`);
    }

    const handleClickCategoryName = () => {
        console.log('category-name');
        navigate(`/categories/${item.id}`);
    }

    return (
        <CategoryItemContainer>
            <div className="thumbnail-container" onClick={handleClickThumbnail}>
                <img src={item.thumbnail} alt={item.name} />
                {item.interested > 300000 && <div className="popular-tag">Popular</div>} 
            </div>
            <div className="description-container">
                <div className="info-container">
                    <div className="title" onClick={handleClickCategoryName}>
                        {item.name}
                    </div>
                    <div className="interested">
                        {convertView(item.interested)} interested
                    </div>
                </div>
                <div className="option">
                    <ActionButton icon={<Icons.More />} onclick={() => { }} tooltip="Options" />
                </div>
            </div>
        </CategoryItemContainer>
    );
};

export default CategoryItem;
import { CategoryItemContainer } from "./CategoryItem.styled";
import { convertView } from "../../../utils/convert";
import { Icons} from "../../../assets/icons/Icon";
import ActionButton from "../../commons/ActionButton";

const CategoryItem = ({ item }) => {
    return (
        <CategoryItemContainer>
            <div className="thumbnail-container">
                <img src={item.thumbnail} alt={item.name} />
                <div className="popular-tag">Popular</div>
            </div>
            <div className="description-container">
                <div className="info-container">
                    <div className="title">
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
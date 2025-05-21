import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import { CategoryListContainer } from "./CategoryList.styled"
import { Icons } from "../../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";

const CategoryList = ({ title, onSeeAll=true, list=undefined}) => {

    const navigate = useNavigate();
    const categories = list || useSelector((state) => state.category.categories);

    const handleClickSeeAll = () => {
        navigate('/categories')
    };

    return (
        <CategoryListContainer>
            <div className="header">
                <div className="title-heading">{title}</div>
                {onSeeAll && <div className="seeall-heading" onClick={handleClickSeeAll}>See all <Icons.ArrowRight className="icon" /></div>}
            </div>
            <div className="category-list-container">
                {categories.map((category) => {
                    return (<CategoryItem key={category.id} item={category} />);
                })}
            </div>
        </CategoryListContainer>
    );
};

export default CategoryList;
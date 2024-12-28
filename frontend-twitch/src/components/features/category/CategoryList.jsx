import { useSelector } from "react-redux";
import CategoryItem from "./CategoryItem";
import { CategoryListContainer } from "./CategoryList.styled"

const CategoryList = ({ title }) => {

    const categories = useSelector((state) => state.category.categories);

    return (
        <CategoryListContainer>
            <div className="title-heading">{title}</div>
            <div className="category-list-container">
                {categories.map((category) => {
                    return (<CategoryItem key={category.id} item={category} />);
                })}
            </div>
        </CategoryListContainer>
    );
};

export default CategoryList;
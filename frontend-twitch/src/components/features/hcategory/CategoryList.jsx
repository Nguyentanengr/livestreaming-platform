import { useSelector, useDispatch } from "react-redux";
import { CategoryListContainer } from "./CategoryList.styled";
import { useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { Icons } from "../../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import { getRecommendedCategories } from "../../../service/api/categoryApi";

const CategoryList = ({ title, onSeeAll = true, list = undefined }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        if (!list) {
            dispatch(getRecommendedCategories({ key: '', page: 0, size: 12 }));
        }
    }, [dispatch, list]);

    const displayCategories = list || categories;

    const handleClickSeeAll = () => {
        navigate('/categories');
    };

    if (loading && !list) {
        return <CategoryListContainer>Loading...</CategoryListContainer>;
    }

    if (error && !list) {
        return <CategoryListContainer>Error: {error.message}</CategoryListContainer>;
    }

    return (
        <CategoryListContainer>
            <div className="header">
                <div className="title-heading">{title}</div>
                {onSeeAll && (
                    <div className="seeall-heading" onClick={handleClickSeeAll}>
                        See all <Icons.ArrowRight className="icon" />
                    </div>
                )}
            </div>
            <div className="category-list-container">
                {displayCategories?.map((category) => (
                    <CategoryItem
                        key={category.id}
                        item={{
                            id: category.id,
                            name: category.name,
                            thumbnail: category.thumbnail,
                            interested: category.interestedCount,
                        }}
                    />
                ))}
            </div>
        </CategoryListContainer>
    );
};

export default CategoryList;
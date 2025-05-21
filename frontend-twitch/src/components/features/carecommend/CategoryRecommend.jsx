import CategoryList from '../hcategory/CategoryList';
import { CategoryRecommendContainer } from './CategoryRecommend.styled';

const CategoryRecommend = () => {
    return (
        <CategoryRecommendContainer>
            <CategoryList title={'Recommended For You'} onSeeAll={false} />
        </CategoryRecommendContainer>
    );
};

export default CategoryRecommend;
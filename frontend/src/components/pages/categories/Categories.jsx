import CategoryAll from '../../features/caall/CategoryAll';
import CategoryFilter from '../../features/cafilter/CategoryFilter';
import CategoryRecommend from '../../features/carecommend/CategoryRecommend';
import { CategoriesContainer } from './Categories.styled';

const Categories = () => {
    return (
        <CategoriesContainer>
            <div className="cate-filter-cnt">
                <CategoryFilter />
            </div>
            <div className="cate-all-cnt">
                <CategoryAll />
            </div>
            <div className="cate-recommended-cnt">
                <CategoryRecommend />
            </div>
            
        </CategoriesContainer>
    );
};

export default Categories;
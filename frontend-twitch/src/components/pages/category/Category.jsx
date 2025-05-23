import { useLocation, useParams } from 'react-router-dom';
import { CategoryContainer } from './Category.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryList from '../../features/hcategory/CategoryList';
import CategoryInfo from '../../features/cainfo/CategoryInfo';
import ChannelList from '../../features/hchannel/ChannelList';
import { getCategoryById, getCategoryStreams } from '../../../service/api/categoryApi';

const Category = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { selectedCategory, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        console.log("categoryId ", categoryId);
        if (categoryId) {
            
            dispatch(getCategoryById(categoryId));
            dispatch(getCategoryStreams({ categoryId, key: '', page: 0, size: 16 }));
        }
    }, [dispatch, categoryId]);

    if (loading) {
        return <CategoryContainer>Loading...</CategoryContainer>;
    }

    if (error) {
        return <CategoryContainer>Error: {error.message}</CategoryContainer>;
    }

    return (
        <CategoryContainer>
            <div className="category-info">
                <CategoryInfo />
            </div>
            <div className="lives-cnt">
                <ChannelList title={`${selectedCategory?.name || 'Category'}'s lives`} type={'related'} />
            </div>
            {/* <div className="similar-cate">
                <CategoryList title={'Similar Categories'} onSeeAll={false} />
            </div> */}
        </CategoryContainer>
    );
};

export default Category;
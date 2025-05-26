import { useParams } from 'react-router-dom';
import { CategoryInfoContainer } from './CategoryInfo.styled';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../../assets/icons/Icon';
import { convertView } from '../../../utils/convert';
import { categoryInterest, categoryUninterest } from '../../../service/api/categoryApi';

const CategoryInfo = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { selectedCategory, loading, error } = useSelector((state) => state.category);

    const handleToggleInterest = () => {
        if (selectedCategory && localStorage.getItem("accessToken")) {
            if (selectedCategory.isInterested) {
                dispatch(categoryUninterest({
                    categoryId: selectedCategory.id,
                    isInterested: selectedCategory.isInterested,
                }));
            } else {
                dispatch(categoryInterest({
                    categoryId: selectedCategory.id,
                    isInterested: selectedCategory.isInterested,
                }));
            }
        } else {
            console.log('Please log in to follow this category');
        }
    };

    if (loading) {
        return <CategoryInfoContainer>Loading...</CategoryInfoContainer>;
    }

    if (error) {
        return <CategoryInfoContainer>Error: {error.message}</CategoryInfoContainer>;
    }

    if (!selectedCategory) {
        return <CategoryInfoContainer>No category data available</CategoryInfoContainer>;
    }

    return (
        <CategoryInfoContainer>
            <div className="info-detail">
                <div className="thumbnail">
                    <img src={selectedCategory.thumbnail} alt={selectedCategory.name} />
                </div>
                <div className="detail">
                    <div className="name">
                        {selectedCategory.name}
                    </div>
                    <div className="interested">
                        <Icons.Star /> {convertView(selectedCategory.interestedCount)} interested
                    </div>
                    <div className="des">
                        {selectedCategory.description}
                    </div>
                    {selectedCategory.isInterested ? <div className="unfollow-btn" onClick={handleToggleInterest}>
                        <Icons.HeartEmpty className="icon" />
                        Uninterested
                    </div> : <div className="follow-btn" onClick={handleToggleInterest}>
                        <Icons.HeartFill className="icon" />
                        Interested
                    </div>}
                    {error && <div className="error">Error: {error.message}</div>}
                </div>
            </div>
        </CategoryInfoContainer>
    );
};

export default CategoryInfo;
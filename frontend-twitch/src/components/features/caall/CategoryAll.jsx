import { useState } from 'react';
import CategoryList from '../hcategory/CategoryList';
import { CategoryAllContainer } from './CategoryAll.styled';
import { useSelector } from 'react-redux';

const CategoryAll = () => {
    const { categoryList } = useSelector((state) => state.categories);

    return (
        <CategoryAllContainer>
            <CategoryList title={'All categories'} list={categoryList} onSeeAll={false} />
        </CategoryAllContainer>
    );
};

export default CategoryAll;
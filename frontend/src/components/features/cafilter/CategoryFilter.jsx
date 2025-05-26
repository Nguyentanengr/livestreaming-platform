import { useEffect, useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { CategoryFilterContainer } from './CategoryFilter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getInterestedCategories } from '../../../service/api/categoryApi';

const CategoryFilter = () => {
    const [searchInput, setSearchInput] = useState('');
    const [options, setOptions] = useState(['All categories', 'Your Interests']);
    const [optionSelected, setOptionSelected] = useState(0);
    const dispatch = useDispatch();
    const { categoryList } = useSelector((state) => state.categories);

    const handleClickOption = (index) => {
        setOptionSelected(index);
    };

    useEffect(() => {
        if (optionSelected == 0) {
            console.log("get all category with key ", searchInput);
            dispatch(getAllCategory({key: searchInput, page: 0, size: 100}));
        } else {
            console.log("get interested category with key ", searchInput);
            dispatch(getInterestedCategories({key: searchInput, page: 0, size: 100}));
        }
    }, [searchInput, optionSelected, dispatch]);

    return (
        <CategoryFilterContainer>
            <div className="ca-title">
                Browse Categories
            </div>
            <div className="filter-cnt">
                <div className="search-cnt">
                    <div className="icon-cnt">
                        <Icons.SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder='Search categories'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div className="option-cnt">
                    {options.map((option, index) => (
                        <div
                            className={`option-item ${optionSelected === index ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleClickOption(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </CategoryFilterContainer>
    );
};

export default CategoryFilter;
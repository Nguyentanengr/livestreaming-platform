import { useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { CategoryFilterContainer } from './CategoryFilter.styled';

const CategoryFilter = () => {
    const [searchInput, setSearchInput] = useState('');
    const [options, setOptions] = useState(['All categories', 'Your Interests']);
    const [optionSelected, setOptionSelected] = useState(0);

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
                            onClick={() => setOptionSelected(index)}
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
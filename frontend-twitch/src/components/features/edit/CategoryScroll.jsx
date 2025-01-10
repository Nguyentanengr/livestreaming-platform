
import { useState } from "react";
import { CategoryScrollContainer } from "./CategoryScroll.styled";
import { useEffect } from "react";
import { convertView } from "../../../utils/convert";

const CategoryScroll = ({ searchKey = "", toggle }) => {

    const categories = [
        { id: 1, name: "Dota2", thumbnail: "/images/categories/game1.jpg", interested: "24400" },
        { id: 2, name: "Valorant", thumbnail: "/images/categories/game2.jpg", interested: "57944" },
        { id: 3, name: "MineCraft", thumbnail: "/images/categories/game3.jpg", interested: "2360009" },
        { id: 4, name: "Pubg Mobile", thumbnail: "/images/categories/game4.jpg", interested: "57000" },
        { id: 5, name: "EA Sports", thumbnail: "/images/categories/game5.jpg", interested: "78000" },
        { id: 6, name: "Lien Quan", thumbnail: "/images/categories/game6.jpg", interested: "23456" },
        { id: 7, name: "Free Fire", thumbnail: "/images/categories/game7.jpg", interested: "68434" },
        { id: 8, name: "Snip Counter", thumbnail: "/images/categories/game8.jpg", interested: "28439" },
        { id: 9, name: "Action Thumb", thumbnail: "/images/categories/game9.jpg", interested: "83858" },
        { id: 10, name: "Killer Snip", thumbnail: "/images/categories/game10.jpg", interested: "13924" },
    ];

    const [searchCategories, setSearchCategories] = useState(categories);

    const [selected, setSelected] = useState({});

    const handleClickCategoryItem = (category) => {
        setSelected(category);
        toggle(false);
    }

    useEffect(() => {
        setSearchCategories(categories.filter(
            each => each.name.toLowerCase().includes(searchKey.toLowerCase())
        ));
    }, [searchKey])


    return (
        <CategoryScrollContainer>
            {searchCategories.map(category =>
                <div
                    className="cate-item"
                    key={category.id}
                    onClick={() => handleClickCategoryItem(category)}
                >
                    <div className="thumbnail">
                        <img src={category.thumbnail} alt={category.name} />
                    </div>
                    <div className="description">
                        <div className="name">
                            {category.name}
                        </div>
                        <div className="interested">
                            {convertView(category.interested)}
                            <div className="text">
                                Interested
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CategoryScrollContainer>
    );
};

export default CategoryScroll;
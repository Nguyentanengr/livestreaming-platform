
import { CategoryScrollContainer } from "./CategoryScroll.styled";
import { convertView } from "../../../utils/convert";
import { useState } from "react";

const CategoryScroll = ({ searchList, selected, onClickItem }) => {

    return (
        <CategoryScrollContainer>
            <div className="scroll-box">
                {searchList.map((category, index) =>
                    <div
                        className="cate-item"
                        key={index}
                        onClick={() => onClickItem(index)}
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
            </div>
        </CategoryScrollContainer>
    );
};

export default CategoryScroll;
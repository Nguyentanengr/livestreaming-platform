import { useParams } from 'react-router-dom';
import { CategoryInfoContainer } from './CategoryInfo.styled';
import { useState } from 'react';
import { Icons } from '../../../assets/icons/Icon';
import { convertView } from '../../../utils/convert';

const CategoryInfo = () => {

    const { category } = useParams();

    const [item, setItem] = useState({
        id: 6,
        name: "EA Sports",
        description: 'Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games. Players play as one of a set of Agents, characters based on several countries and cultures around the world.',
        thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/2011938005_IGDB-285x380.jpg",
        interested: 558903,
        isFollowed: false,
    });

    return (
        <CategoryInfoContainer>
            <div className="info-detail">
                <div className="thumbnail">
                    <img src={item.thumbnail} alt="" />
                </div>
                <div className="detail">
                    <div className="name">
                        {category}
                    </div>
                    <div className="interested">
                        <Icons.Star /> {convertView(item.interested)}  interested
                    </div>
                    <div className="des">
                        {item.description}
                    </div>
                    <div className="follow-btn">
                        <Icons.HeartFill className='icon' /> Interested
                    </div>
                </div>
            </div>

        </CategoryInfoContainer>
    );
};

export default CategoryInfo;
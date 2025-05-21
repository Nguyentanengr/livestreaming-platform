import { useParams } from 'react-router-dom';
import { CategoryContainer } from './Category.styled';
import { useState } from 'react';
import CategoryList from '../../features/hcategory/CategoryList';
import CategoryInfo from '../../features/cainfo/CategoryInfo';
import ChannelList from '../../features/hchannel/ChannelList';

const Category = () => {

    const { category } = useParams();

    const item = useState({
        id: 6,
        name: "EA Sports",
        description: 'Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games. Players play as one of a set of Agents, characters based on several countries and cultures around the world.',
        thumbnail: "https://static-cdn.jtvnw.net/ttv-boxart/2011938005_IGDB-285x380.jpg",
        interested: 558903,
        isFollowed: false,
    });

    return (
        <CategoryContainer>
            <div className="category-info">
                <CategoryInfo />
            </div>
            <div className="lives-cnt">
                <ChannelList title={`${category}'s lives`} type={'related'} />
            </div>
            {/* <div className="similar-cate">
                <CategoryList title={'Similar Categories'} onSeeAll={false} />
            </div> */}
        </CategoryContainer>
    );
};

export default Category;
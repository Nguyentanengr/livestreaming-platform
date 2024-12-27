import { useSelector } from "react-redux";
import { ChannelListContainer } from "./ChannelList.styled"
import { useState } from "react";
import ChannelItem from "./ChannelItem";
import ShowMore from "../../commons/ShowMore";

const ChannelList = ({ title }) => {

    const lives = useSelector((state) => state.recommend.lives);
    const [showMore, setShowMore] = useState(false);

    const livesToShow = showMore ? lives : lives.slice(0, 4);

    const handleShowMore = () => {
        setShowMore(!showMore);
        console.log(showMore);
        
    }
    
    return (
        <ChannelListContainer>
            <div className="title-heading">{title}</div>
            <div className="recommend-live-container">
                {livesToShow.map((live) => {
                    return (
                        <ChannelItem key={live.id} live={live} />
                    );
                })}
            </div>
            <ShowMore title={showMore ? "Show Less" : "Show More"} onclick={handleShowMore} />
        </ChannelListContainer>
    );
};

export default ChannelList;
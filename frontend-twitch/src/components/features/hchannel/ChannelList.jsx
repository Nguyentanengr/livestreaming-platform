import { useSelector } from "react-redux";
import { ChannelListContainer } from "./ChannelList.styled"
import { useState } from "react";
import ChannelItem from "./ChannelItem";
import ShowMore from "../../commons/ShowMore";

const ChannelList = ({ title, type }) => {

    const [showMore, setShowMore] = useState(false);
    var items = null;
    var typeItem = null;
    
    switch (type) {
        case "recommended":
            items = useSelector((state) => state.recommend.lives);
            typeItem = "live";
            break;
        case "recent":
            items = useSelector((state) => state.recent.videos);
            typeItem = "video";
            break;
    }
           
    const itemsToShow = showMore ? items : items.slice(0, 4);
    const handleShowMore = () => {
        setShowMore(!showMore);
    }
    
    return (
        <ChannelListContainer>
            <div className="title-heading">{title}</div>
            <div className="recommend-live-container">
                {itemsToShow.map((item) => {
                    return (
                        <ChannelItem key={item.id} item={item} type={typeItem}/>
                    );
                })}
            </div>
            <ShowMore title={showMore ? "Show Less" : "Show More"} onclick={handleShowMore} />
        </ChannelListContainer>
    );
};

export default ChannelList;
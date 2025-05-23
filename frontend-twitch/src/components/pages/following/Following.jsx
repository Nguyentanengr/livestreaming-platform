import { FollowingContainer } from "./Following.styled"
import ChannelList from "../../features/hchannel/ChannelList";
import ThumbChannelList from "../../features/fchannel/ThumbChannelList";
import ReelFollowedList from "../../features/freel/ReelFollowedList";
import { useState } from "react";
import StreamerRecommendList from "../../features/fstreamers/StreamerRecommendList";


const Following = () => {

    const [filters, setFilters] = useState(['Overview', 'Streamers']);
    const [selectedFilter, setSelectedFilter] = useState(0);

    const handleClickFilter = (index) => {
        setSelectedFilter(index);
    };
    
    return (
        <FollowingContainer>
            <div className="filter-cnt">
                {filters.map((filter, index) => <div
                    className={`filter-item ${selectedFilter === index ? 'selected' : ''}`}
                    key={index}
                    onClick={() => handleClickFilter(index)}
                >
                    {filter}
                </div>)}
            </div>
            {/* <div className="chanels-container">
                <ReelFollowedList />
            </div> */}
            <div className="related-lives">
                <ChannelList title="Related Lives" type="followed-stream" />
            </div>
            <div className="recomment-streamer">
                <StreamerRecommendList title="Recommended Channels" />
            </div>
            <div className="recent-related-lives">
                <ChannelList title="Recent Lives" type="recent-stream" />
            </div>
            
        </FollowingContainer>
    );
};

export default Following;
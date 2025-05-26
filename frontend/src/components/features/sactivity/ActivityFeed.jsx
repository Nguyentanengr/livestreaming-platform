import { ActivityFeedContainer } from "./ActivityFeed.styled";
import TitleBar from "../../commons/TitleBar";
import FeedItem from "./FeedItem";

const ActivityFeed = () => {

    const feeds = [
  
    ]
    return (
        <ActivityFeedContainer>
            <TitleBar className='title-bar' title="Activity Feeds" />
            <div className="feed-container">
                {feeds.map((feed) => {
                    return (
                        <div className="item" key={feed.id}>
                            <FeedItem
                                className="feed-item"
                                feed={feed}
                            />
                            <div className="line" />
                        </div>
                    );
                })}
            </div>
        </ActivityFeedContainer>
    );
};

export default ActivityFeed;
import { ActivityFeedContainer } from "./ActivityFeed.styled";
import TitleBar from "../../commons/TitleBar";
import FeedItem from "./FeedItem";

const ActivityFeed = () => {

    const feeds = [
        { id: 1, user: "RikCode123", type: "followed", timestamp: "this time" },
        { id: 2, user: "CodeCamp", type: "followed", timestamp: "this time" },
        { id: 3, user: "ItChina", type: "gift", timestamp: "this time" },
        { id: 4, user: "ItChina", type: "gift", timestamp: "this time" },
        { id: 5, user: "ItChina", type: "gift", timestamp: "this time" },
        { id: 6, user: "CodeCamp", type: "gift", timestamp: "this time" },
    ]
    return (
        <ActivityFeedContainer>
            <TitleBar title="Activity Feeds" />
            <div className="feed-container">
                {feeds.map((feed) => {
                    return (
                        <>
                            <FeedItem
                                key={feed.id}
                                className="feed-item"
                                feed={feed}
                            />
                            <hr />
                        </>
                    );
                })}
            </div>
        </ActivityFeedContainer>
    );
};

export default ActivityFeed;
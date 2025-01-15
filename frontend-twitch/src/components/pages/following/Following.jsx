import { FollowingContainer } from "./Following.styled"
import ChannelList from "../../features/hchannel/ChannelList";
import ThumbChannelList from "../../features/fchannel/ThumbChannelList";


const Following = () => {
    return (
        <FollowingContainer>
            <div className="chanels-container">
                <ThumbChannelList />
            </div>
            <div className="related-lives">
                <ChannelList title="Related Lives" type="related"/>
            </div>
            <div className="recent-related-lives">
                <ChannelList title="Recent Lives" type="recent-related" />
            </div>
        </FollowingContainer>
    );
};

export default Following;
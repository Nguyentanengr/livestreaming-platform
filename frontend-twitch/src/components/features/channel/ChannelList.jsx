import { useSelector } from "react-redux";
import { ChannelListContainer } from "./ChannelList.styled"
import ChannelItem from "./ChannelItem";

const ChannelList = ({ title }) => {

    const lives = useSelector((state) => state.recommend.lives);
    
    return (
        <ChannelListContainer>
            <div className="title-heading">{title}</div>
            <div className="recommend-live-container">
                {lives.map((live) => {
                    return (
                        <ChannelItem key={live.id} live={live} />
                    );
                })}
            </div>
        </ChannelListContainer>
    );
};

export default ChannelList;
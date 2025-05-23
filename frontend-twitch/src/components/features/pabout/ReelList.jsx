import { useState, useMemo } from "react";
import ReelItem from "./ReelItem";
import { ReelListContainer } from "./ReelList.styled";

const ReelList = ({ itemsToShow }) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const memoizedItems = useMemo(() => itemsToShow, [itemsToShow]);

    return (
        <ReelListContainer isVideoPlaying={isVideoPlaying}>
            <div className="recommend-live-container">
                {memoizedItems.map((item) => (
                    <ReelItem
                        key={item.id}
                        item={item}
                        onVideoOpen={setIsVideoPlaying}
                    />
                ))}
            </div>
        </ReelListContainer>
    );
};

export default ReelList;
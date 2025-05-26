import { ReelFollowedItemContainer } from './ReelFollowedItem.styled';

const ReelFollowedItem = ({ reel }) => {
    return (
        <ReelFollowedItemContainer>
            <img src={reel.thumbnail} alt="" />
            <div className="duration">
                {reel.duration}
            </div>
            <div className="reel-info">
                <div className="title">
                    {reel.titleReel}
                </div>
                <div className="username">
                    {reel.username}
                </div>
            </div>
        </ReelFollowedItemContainer>
    );
};

export default ReelFollowedItem;
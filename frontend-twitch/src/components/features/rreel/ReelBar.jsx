import { ReelBarContainer } from "./ReelBar.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ReelProfile from "./ReelProfile";
import VideoAction from "../../commons/VideoAction";
import { likeReel, unlikeReel } from "../../../service/api/reelApi";

const ReelBar = ({ reel, exComment, exShare }) => {
    const dispatch = useDispatch();
    const [action, setAction] = useState({
        isLiked: reel.isLiked || false, // Initialize with reel's isLiked state
        isComment: false,
        isShare: false,
    });

    const toggleAction = (key) => {
        setAction((action) => ({
            ...action,
            [key]: !action[key],
        }));
    };

    const handleLikeClick = () => {
        toggleAction('isLiked');
        if (!action.isLiked) {
            // Dispatch likeReel action
            dispatch(likeReel({ reelId: reel.id }));
        } else {
            // Dispatch unlikeReel action
            dispatch(unlikeReel({ reelId: reel.id }));
        }
    };

    const handleCommentClick = () => {
        toggleAction('isComment');
        exComment();
    };

    const handleShareClick = () => {
        toggleAction('isShare');
        exShare();
    };

    return (
        <ReelBarContainer>
            <ReelProfile reel={reel} />
            {!action.isLiked ? (
                <VideoAction
                    count={reel.likesCount}
                    icon={<Icons.HeartEmpty />}
                    onclick={handleLikeClick}
                />
            ) : (
                <VideoAction
                    count={reel.likesCount}
                    icon={<Icons.HeartFill />}
                    onclick={handleLikeClick}
                />
            )}
            <VideoAction
                count={reel.commentsCount}
                icon={<Icons.Chat />}
                onclick={handleCommentClick}
            />
            <VideoAction icon={<Icons.More />} onclick={handleShareClick} />
        </ReelBarContainer>
    );
};

export default ReelBar;
import { ReelBarContainer } from "./ReelBar.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useState } from "react";

import ReelProfile from "./ReelProfile";
import VideoAction from "../../commons/VideoAction";

const ReelBar = ({ reel, exComment, exShare }) => {

    const [action, setAction] = useState({
        isLiked: false,
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
    }

    const handleCommentClick = () => {
        toggleAction('isComment');
        exComment();
    }

    const handleShareClick = () => {
        toggleAction('isShare');
        exShare();
    }

    return (
        <ReelBarContainer>
            <ReelProfile reel={reel} />
            {!action.isLiked ? <VideoAction count={92489} icon={<Icons.Like />} onclick={handleLikeClick} />
                : <VideoAction count={24549} icon={<Icons.LikeFill />} onclick={handleLikeClick} />}
            <VideoAction count={2474} icon={<Icons.Comment />} onclick={handleCommentClick} />
            <VideoAction count={99} icon={<Icons.Share />} onclick={handleShareClick} />
        </ReelBarContainer>
    );
};

export default ReelBar;

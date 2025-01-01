import { ReelBarContainer } from "./ReelBar.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";

import VideoAction from "../../commons/VideoAction";
import Thumbnail from "../../commons/Thumbnail";

const ReelBar = ({ reel }) => {

    const navigate = useNavigate();

    return (
        <ReelBarContainer>
            <div className="interaction-container">
                <div className="profile-container">
                    <Thumbnail
                        src={reel.thumbnail}
                        onclick={() => { navigate(`/profile/${reel.username}`) }}
                        size="large"
                    />
                    <div className={`follow-button ${isFollowed ? 'followed' : ''}`}
                        onClick={handleFollowClick}
                    >
                        {!isFollowed ? <Icons.FollowPlus className="follow-icon" />
                            : <Icons.FollowedPlus className="follow-icon" />}
                    </div>
                </div>

                {!isLiked ? <VideoAction count={3489} icon={<Icons.Like />} onclick={handleLikeClick} />
                    : <VideoAction count={3489} icon={<Icons.LikeFill />} onclick={handleLikeClick} />}
                <VideoAction count={244} icon={<Icons.Comment />} onclick={handleCommentClick} />
                <VideoAction count={99} icon={<Icons.Share />} />
            </div>
        </ReelBarContainer>
    )
}

export default ReelBar;

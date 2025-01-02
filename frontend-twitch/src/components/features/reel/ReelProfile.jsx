
import { ReelProfileContainer } from "./ReelProfile.styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icons } from "../../../assets/icons/Icon";

import Thumbnail from "../../commons/Thumbnail";

const ReelProfile = ({ reel }) => {

    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed);
    }

    return (
        <ReelProfileContainer>
            <div className="profile-container">
                <Thumbnail
                    src={reel.thumbnail}
                    onclick={() => { navigate(`/profile/${reel.username}`) }}
                    size="large"
                />
                <div className={`follow-button ${isFollowed ? 'followed' : ''}`}
                    onClick={handleFollowClick}>
                    {!isFollowed ? <Icons.FollowPlus className="follow-icon" />
                        : <Icons.FollowedPlus className="follow-icon" />}
                </div>
            </div>
        </ReelProfileContainer>
    );
};

export default ReelProfile;
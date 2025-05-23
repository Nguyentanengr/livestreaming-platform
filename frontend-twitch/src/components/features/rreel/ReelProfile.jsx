import { ReelProfileContainer } from "./ReelProfile.styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../assets/icons/Icon";
import Thumbnail from "../../commons/Thumbnail";
import { followUser, unfollowUser } from "../../../service/api/reelApi";

const ReelProfile = ({ reel }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('Reel data in ReelProfile:', reel);

    const isFollowing = useSelector((state) =>
        state.recommendReel.reels.find((r) => r.id === reel.id)?.user?.isFollowing
    ) || reel.user?.isFollowing || false;

    const handleFollowClick = () => {
        console.log(`Handle follow click for ${reel.user.username}, isFollowing: ${isFollowing}`);
        if (isFollowing) {
            console.log(`Dispatching unfollowUser for ${reel.user.username}`);
            dispatch(unfollowUser({ username: reel.user.username }));
        } else {
            console.log(`Dispatching followUser for ${reel.user.username}`);
            dispatch(followUser({ username: reel.user.username }));
        }
    };

    const handleAvatarClick = (username) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === username) {
            navigate('/you')
        } else {
            navigate(`/channel/${username}`);
        }
    }

    return (
        <ReelProfileContainer>
            <div className="profile-container">
                <Thumbnail
                    src={reel.user?.avatar || reel.thumbnail}
                    onclick={() => handleAvatarClick(reel.user.username)}
                    size="medium"
                />
                <div
                    className={`follow-button ${isFollowing ? 'followed' : ''}`}
                    onClick={handleFollowClick}
                >
                    {!isFollowing ? (
                        <Icons.FollowPlus className="follow-icon" />
                    ) : (
                        <Icons.FollowedPlus className="follow-icon" />
                    )}
                </div>
            </div>
        </ReelProfileContainer>
    );
};

export default ReelProfile;
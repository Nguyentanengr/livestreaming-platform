import { ReelItemContainer } from "./ReelItem.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef, useState } from "react";
import { useVideoObserver } from "../../../hooks/useVideoObserver";
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";

const ReelItem = ({ reel }) => {

    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const isVisible = useVideoObserver(videoRef, {
        threshold: 0.7,
    });

    useEffect(() => {
        if (isVisible) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isVisible]);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    }

    const handleFollowClick = () => {
        setIsFollowed(!isFollowed);
    }

    const handleMuteClick = () => {
        setIsMuted(!isMuted);
    }
    
    return (
        <ReelItemContainer>
            <div className="view-container">
                <video ref={videoRef} src={reel.videoUrl} loop />
                <div className="mute-container" onClick={handleMuteClick}>
                    {isMuted ? <Icons.Unmute className="mute-icon display" /> : <Icons.Mute className="mute-icon" />}
                </div>
                <div className="option-container">
                    <Icons.More className="more-icon" />
                </div>
                <div className="reel-info-container">
                    <div className="username">{reel.username}</div>
                    <div className="reel-title">
                        {reel.title}
                        
                    </div>
                    <div className="tags-container">
                        {reel.tags.map((tag) => {
                            return <div className="tag">#{tag.name}</div>
                        })}
                    </div>
                </div>
            </div>
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
                <div className={`like-container ${isLiked ? "able" : ""}`}>
                    {!isLiked ? <Icons.Like className="like-icon" onClick={handleLikeClick} />
                        : <Icons.LikeFill className="like-icon" onClick={handleLikeClick} />}
                    <div className="like-count">3493</div>
                </div>
                <div className="comment-container">
                    <Icons.Comment className="comment-icon" />
                    <div className="comment-count">244</div>
                </div>
                <div className="share-container">
                    <Icons.Share className="share-icon" />
                    <div className="share-count">99</div>
                </div>
            </div>
        </ReelItemContainer>
    );
};

export default ReelItem;
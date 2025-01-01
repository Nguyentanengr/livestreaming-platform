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
    const [isExpandComment, setIsExpandComment] = useState(false);
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

    const handleMuteClick = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    }

    const handleViewClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }

    const handleOptionClick = (e) => {
        e.stopPropagation();
    }

    const handleNameClick = (e) => {
        e.stopPropagation();
        navigate(`/profile/${reel.username}`);
    }

    const handleTagClick = (e, index) => {
        e.stopPropagation();
        navigate(`/tags/${reel.tags[index].name}`);
    }

    const handleCommentClick = () => {
        setIsExpandComment(!isExpandComment);
    }

  
    return (
        <ReelItemContainer>
            <div className={`${isExpandComment ? "" : "gap"}`}></div>
            <div className="view-container" onClick={handleViewClick}>
                <video ref={videoRef} src={reel.videoUrl} loop />
                <div className="mute-container" onClick={(e) => handleMuteClick(e)}>
                    {isMuted ? <Icons.Unmute className="mute-icon display" /> : <Icons.Mute className="mute-icon" />}
                </div>
                <div className="option-container" onClick={(e) => handleOptionClick(e)}>
                    <Icons.More className="more-icon" />
                </div>
                <div className="reel-info-container">
                    <div className="username" onClick={(e) => handleNameClick(e)}>{reel.username}</div>
                    <div className="reel-title">
                        {reel.title}

                    </div>
                    <div className="tags-container">
                        {reel.tags.map((tag, index) => {
                            return <div className="tag" key={index} onClick={(e) => handleTagClick(e, index)}>#{tag.name}</div>
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
                <div className="comment-container" onClick={handleCommentClick}>
                    <Icons.Comment className="comment-icon" />
                    <div className="comment-count">244</div>
                </div>
                <div className="share-container" >
                    <Icons.Share className="share-icon" />
                    <div className="share-count">99</div>
                </div>
            </div>
            {isExpandComment &&
                <div className={`box-comment-container`}>

                </div>}
        </ReelItemContainer>
    );
};

export default ReelItem;
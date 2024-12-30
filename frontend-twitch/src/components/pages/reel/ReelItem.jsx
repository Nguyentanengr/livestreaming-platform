import { ReelItemContainer } from "./ReelItem.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef, useState } from "react";
import { useVideoObserver } from "../../../hooks/useVideoObserver";

const ReelItem = ( { reel } ) => {

    const videoRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);
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
    return (
        <ReelItemContainer>
            <div className="view-container">
                <video ref={videoRef} src={reel.videoUrl} loop />
            </div>
            <div className="interaction-container">
                <div className={`like-container ${isLiked ? "able" : ""}`}>
                    {!isLiked ? <Icons.Like className="like-icon" onClick={handleLikeClick}/> 
                    : <Icons.LikeFill className="like-icon" onClick={handleLikeClick}/>}
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
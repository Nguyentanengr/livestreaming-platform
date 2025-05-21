

import { useNavigate } from "react-router-dom";
import { ReelViewContainer } from "./ReelView.styled";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef, useState } from "react";
import { useVideoObserver } from "../../../hooks/useVideoObserver";

const ReelView = ({ reel}) => {

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);

    const handleMuteClick = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    }

    const handleOptionClick = (e) => {
        e.stopPropagation();
    }

    const handleNameClick = (e) => {
        e.stopPropagation();
        navigate(`/profile/${reel.username}`);
    };

    const handleTagClick = (e, index) => {
        e.stopPropagation();
        navigate(`/tag/${reel.tags[index].name}`);
    };

    const handleViewClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }

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

    return (
        <ReelViewContainer onClick={handleViewClick}>
            <video  ref={videoRef} src={reel.videoUrl} loop/>
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
        </ReelViewContainer>
    )
}

export default ReelView;

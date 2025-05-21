import { useDispatch, useSelector } from "react-redux";
import { SlideScreenContainer } from "./SlideScreen.styled";
import { useEffect, useRef, useState } from "react";
import LiveScreen from "../../commons/LiveScreen";
import { Icons } from "../../../assets/icons/Icon";
import video from "/videos/streamvideo3.mp4";

const SlideScreen = () => {

    const dispatch = useDispatch();
    const lives = useSelector((state) => state.outstanding.lives);
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {

        videoRef.current.src = video;
        // fetch top lives
        // dispatch setTopLives
    }, [dispatch]);

    const handleLeftArrowClick = () => {
        setCurrentIndex(currentIndex - 1 < 0 ? lives.length - 1 : currentIndex - 1);
    };

    const handleRightArrowClick = () => {
        setCurrentIndex(currentIndex + 1 > lives.length - 1 ? 0 : currentIndex + 1);
    };

    const handleLiveChannelClick = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleLiveChannelMuteClick = () => {
        videoRef.current.muted = !videoRef.current.muted;
    }

    return (
        <SlideScreenContainer>
            <div className="live-channel-container" onClick={handleLiveChannelClick}>
                <LiveScreen videoRef={videoRef} />
                <div className="views"><Icons.HotLive className="views-icon" /> LIVE </div>
                <div className="user-container">
                    <div className="description">
                        <div className="title">{lives[currentIndex].title}</div>
                        <div className="user-name">
                            <div className="name">
                                {lives[currentIndex].username}
                            </div>
                            <Icons.HotLive className="icon" />
                            <div className="view">
                                {lives[currentIndex].views} viewers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SlideScreenContainer>
    );
};

export default SlideScreen;
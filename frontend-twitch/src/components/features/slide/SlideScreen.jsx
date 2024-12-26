import { useDispatch, useSelector } from "react-redux";
import { SlideScreenContainer } from "./SlideScreen.styled";
import { useEffect, useRef, useState } from "react";
import LiveScreen from "../../commons/LiveScreen";
import { Icons } from "../../../assets/icons/Icon";
import video from "/videos/streamvideo1.mp4";

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
            <div className="left-arrow-btn" onClick={handleLeftArrowClick}>
                <Icons.ArrowLeft />
            </div>
            <div className="live-channel-container" onClick={handleLiveChannelClick}>
                <LiveScreen videoRef={videoRef} />
                <div className="banner"><Icons.HotLive className="hot-live-icon" />live</div>
                <div className="views"><Icons.Views className="views-icon" /> {lives[currentIndex].views}</div>
                <div className="user-container">
                    <div className="user-avatar-container">
                        <img src={lives[currentIndex].avatar} className="user-avartar"></img>
                        <div className="user-status">LIVE</div>
                    </div>

                    <div className="description">
                        <div className="user-name">{lives[currentIndex].username}</div>
                        <div className="title">{lives[currentIndex].title}</div>
                    </div>
                </div>
            </div>
            <div className="right-arrow-btn" onClick={handleRightArrowClick}>
                <Icons.ArrowRight />
            </div>
        </SlideScreenContainer>
    );
};

export default SlideScreen;
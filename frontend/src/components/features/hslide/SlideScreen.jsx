import { useDispatch, useSelector } from "react-redux";
import { SlideScreenContainer } from "./SlideScreen.styled";
import { useEffect, useRef, useState } from "react";
import LiveScreen from "../../commons/LiveScreen";
import { Icons } from "../../../assets/icons/Icon";
import { getOutstandingStream } from "../../../service/api/streamApi";
import { convertView } from "../../../utils/convert";

const SlideScreen = () => {
    const dispatch = useDispatch();
    const { outstandingStreams, loading, error } = useSelector((state) => state.stream);
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        dispatch(getOutstandingStream({ page: 0, size: 1 }));
    }, [dispatch]);

    useEffect(() => {
        if (outstandingStreams.length > 0 && videoRef.current) {
            // If video field is available in the future, set it here
            // For now, use thumbnail as a fallback for display
            videoRef.current.poster = outstandingStreams[currentIndex]?.thumbnail || "";
        }
    }, [outstandingStreams, currentIndex]);

    const handleLeftArrowClick = () => {
        setCurrentIndex(currentIndex - 1 < 0 ? outstandingStreams.length - 1 : currentIndex - 1);
    };

    const handleRightArrowClick = () => {
        setCurrentIndex(currentIndex + 1 > outstandingStreams.length - 1 ? 0 : currentIndex + 1);
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
    };

    if (loading) {
        return <SlideScreenContainer>Loading...</SlideScreenContainer>;
    }

    if (error) {
        return <SlideScreenContainer>Error: {error.message}</SlideScreenContainer>;
    }

    if (outstandingStreams.length === 0) {
        return <SlideScreenContainer>No outstanding streams available.</SlideScreenContainer>;
    }

    return (
        <SlideScreenContainer>
            <div className="live-channel-container" onClick={handleLiveChannelClick}>
                <LiveScreen videoRef={videoRef} />
                <div className="views">
                    <Icons.HotLive className="views-icon" /> LIVE
                </div>
                <div className="user-container">
                    <div className="description">
                        <div className="title">{outstandingStreams[currentIndex].title}</div>
                        <div className="user-name">
                            <div className="name">{outstandingStreams[currentIndex].user.username}</div>
                            <Icons.HotLive className="icon" />
                            <div className="view">
                                {convertView(outstandingStreams[currentIndex].viewersCount)} viewers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SlideScreenContainer>
    );
};

export default SlideScreen;
import { StreamPreviewContainer } from "./StreamPreview.styled"
import { useRef } from "react";
import { useEffect } from "react";
import TitleBar from "../../commons/TitleBar";
import Screen from "../../commons/Screen";
import video from "/videos/streamvideo8.mp4";
import { Icons } from "../../../assets/icons/Icon";
import { useState } from "react";
import Counter from "./Counter";

const StreamPreview = () => {

    const videoRef = useRef(null);
    const [isLive, setIsLive] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        if (videoRef.current && videoRef.current.src) {
            setIsVideoLoaded(true);
        }
    }, [videoRef.current]);

    const handleOnWebcam = () => {
        videoRef.current.src = video;
        setIsVideoLoaded(true);
    };

    const handlePresentClick = () => {
        setIsLive(!isLive);

    };

    return (
        <StreamPreviewContainer>
            <TitleBar title="Stream Preview" />
            <div className="screen-stream">
                <Screen videoRef={videoRef} isPlay={false} size="auto" />
                {!isVideoLoaded && <div className="webcam-preview">
                    <div className="description">
                        Use your webcam in preview mode
                    </div>
                    <div className="on-webcam-btn" onClick={handleOnWebcam}>
                        On Webcam
                    </div>
                </div>}
                {isLive && <div className="live-span">
                    <Icons.Live className="live-icon" /> Live
                </div>}
            </div>
            <div className="control">
                <div className="counter-container">
                    <Counter title="Session" counts="00:05:27" />
                    <Counter title="Viewers" counts="23,632" />
                    <Counter title="Follows" counts="299,888" />
                </div>
                <div className={`present-btn ${isLive ? "highlight" : ""}`} onClick={handlePresentClick}>
                    {!isLive ? "Start Streaming" : "Stop Streaming"}
                </div>
            </div>
        </StreamPreviewContainer>
    );
};

export default StreamPreview;
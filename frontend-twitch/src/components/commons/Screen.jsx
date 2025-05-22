import { ScreenContainer } from "./Screen.styled";
import { Icons } from "../../assets/icons/Icon";
import { useState, useEffect, useRef } from "react";

const Screen = ({ videoRef, isPlay = true, size = "medium" }) => {
    const [isPause, setIsPause] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(null);

    // Cập nhật tiến độ video
    useEffect(() => {
        const video = videoRef.current;
        if (video && isPlay) {
            const updateProgress = () => {
                if (video.duration) {
                    setProgress((video.currentTime / video.duration) * 100);
                }
            };
            video.addEventListener("timeupdate", updateProgress);
            return () => video.removeEventListener("timeupdate", updateProgress);
        }
    }, [videoRef, isPlay]);

    // Đảm bảo video phát ngay khi tải trang
    useEffect(() => {
        const video = videoRef.current;
        if (video && isPlay) {
            if (isPause) {
                video.pause();
            } else {
                video.play().catch((error) => {
                    console.error("Error playing video:", error);
                });
            }
        }
    }, [videoRef, isPlay, isPause]);

    // Xử lý click vào video để toggle Pause/Play
    const handleVideoClick = () => {
    
    };

    // Xử lý tua video khi click vào thanh tiến độ
    const handleProgressClick = (e) => {
        e.stopPropagation(); // Ngăn sự kiện lan truyền lên screen-container
        if (videoRef.current && videoRef.current.duration) {
            const rect = progressRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const progressWidth = rect.width;
            const newTime = (clickX / progressWidth) * videoRef.current.duration;
            videoRef.current.currentTime = newTime;
        }
    };

    return (
        <ScreenContainer>
            <div className={`screen-container ${size} ${isExpanded ? "expanded" : ""}`} onClick={handleVideoClick}>
                <video ref={videoRef} className="video" autoPlay loop />
                {isPlay && (
                    <>
                        {isPause && <div className="play" onClick={() => setIsPause(false)}><Icons.Play /></div>}
                        {!isPause && <div className="play" onClick={() => setIsPause(true)}><Icons.Pause /></div>}
                        <div className="progress-wrapper">
                            <div className="progress-bar" ref={progressRef} onClick={handleProgressClick}>
                                <div className="progress" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </>
                )}
                <div className="expand" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <Icons.Exist /> : <Icons.Expand />}
                </div>
            </div>
        </ScreenContainer>
    );
};

export default Screen;
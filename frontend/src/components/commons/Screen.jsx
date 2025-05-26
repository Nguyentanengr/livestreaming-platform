import { ScreenContainer } from "./Screen.styled";
import { Icons } from "../../assets/icons/Icon";
import { useState, useEffect, useRef } from "react";

const Screen = ({ videoRef, isLive = true, size = "medium" }) => {
  const [isPause, setIsPause] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const progressRef = useRef(null);

  // Cập nhật tiến độ video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateProgress = () => {
        if (video.duration && !isLive) {
          setProgress((video.currentTime / video.duration) * 100);
        } else if (isLive) {
          setElapsedTime(video.currentTime);
        }
      };
      video.addEventListener("timeupdate", updateProgress);
      return () => video.removeEventListener("timeupdate", updateProgress);
    }
  }, [videoRef, isLive]);

  // Điều khiển phát video
  useEffect(() => {
    const video = videoRef.current;
    if (video && (video.src || video.srcObject)) {
      if (isPause) {
        console.log('[DEBUG] Pausing video');
        video.pause();
      } else {
        console.log('[DEBUG] Attempting to play video');
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('[ERROR] Error playing video:', error);
            if (error.name === "AbortError") {
              setTimeout(() => {
                video.play().catch((err) => {
                  console.error('[ERROR] Retry play failed:', err);
                });
              }, 100);
            }
          });
        }
      }
    } else {
      console.log('[DEBUG] Video element has no src or srcObject');
    }
  }, [videoRef, isPause]);

  // Xử lý click vào video để toggle Pause/Play
  const handleVideoClick = () => {
    setIsPause(!isPause);
  };

  // Xử lý tua video khi click vào thanh tiến độ
  const handleProgressClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video && video.duration && !isLive) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const progressWidth = rect.width;
      const newTime = (clickX / progressWidth) * video.duration;
      video.currentTime = newTime;
    }
  };

  return (
    <ScreenContainer>
      <div
        className={`screen-container ${size} ${isExpanded ? "expanded" : ""}`}
        onClick={handleVideoClick}
      >
        <video ref={videoRef} className="video" autoPlay />
        <div className="controls">
          {isPause ? (
            <div className="play" onClick={() => setIsPause(false)}>
              <Icons.Play />
            </div>
          ) : (
            <div className="play" onClick={() => setIsPause(true)}>
              <Icons.Pause />
            </div>
          )}
          {videoRef.current?.duration && !isLive && (
            <div className="progress-wrapper">
              <div
                className="progress-bar"
                ref={progressRef}
                onClick={handleProgressClick}
              >
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
          {isLive && (
            <div className="elapsed-time">
              {Math.floor(elapsedTime)}s
            </div>
          )}
        </div>
        <div className="expand" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <Icons.Exist /> : <Icons.Expand />}
        </div>
      </div>
    </ScreenContainer>
  );
};

export default Screen;
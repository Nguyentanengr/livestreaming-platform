
import { useEffect } from "react";
import { LiveScreenContainer } from "./LiveScreen.styled";

const LiveScreen = ( { videoRef } ) => {

    useEffect(() => {
        const videoElement = videoRef.current;

        // Lắng nghe sự kiện canplay và loadedmetadata
        if (videoElement) {
            videoElement.addEventListener('canplay', () => {
                console.log('Video can play now');
            });

            videoElement.addEventListener('loadedmetadata', () => {
                console.log('Video metadata loaded');
            });

            // Lắng nghe sự kiện loadeddata và playing
            videoElement.addEventListener('loadeddata', () => {
                console.log('Video data loaded');
            });

            videoElement.addEventListener('playing', () => {
                console.log('Video is playing');
            });
        }
    }, [videoRef]);
    return (
        <LiveScreenContainer>
            <video ref={ videoRef } autoPlay controls></video>
            <div className="live">live</div>
        </LiveScreenContainer>
    )
}

export default LiveScreen;
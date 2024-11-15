import { LiveScreenContainer } from "./LiveScreen.styled";

import video from "/videos/streamvideo1.mp4";

const LiveScreen = () => {
    return (
        <LiveScreenContainer>
            <video src={video} controls></video>
            <div className="live">live</div>
        </LiveScreenContainer>
    )
}

export default LiveScreen;
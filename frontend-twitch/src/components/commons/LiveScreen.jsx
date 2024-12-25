import { LiveScreenContainer } from "./LiveScreen.styled"


const LiveScreen = ({ videoRef }) => {
    return (
        <LiveScreenContainer>
            <video 
                ref={videoRef} 
                autoPlay 
                muted
                loop
            ></video>
        </LiveScreenContainer>
    );
};

export default LiveScreen;
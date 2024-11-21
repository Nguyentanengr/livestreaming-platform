import { LiveScreenContainer } from "./LiveScreen.styled";


const LiveScreen = () => {
    return (
        <LiveScreenContainer>
            <video src={null} controls></video>
            <div className="live">live</div>
        </LiveScreenContainer>
    )
}

export default LiveScreen;
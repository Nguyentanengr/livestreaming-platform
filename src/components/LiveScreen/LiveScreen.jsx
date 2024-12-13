
import { LiveScreenContainer } from "./LiveScreen.styled";

const LiveScreen = ( { videoRef } ) => {

    return (
        <LiveScreenContainer>
            <video ref={ videoRef } autoPlay controls></video>
            <div className="live">live</div>
        </LiveScreenContainer>
    )
}

export default LiveScreen;
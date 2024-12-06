import { view } from "../../services/socketServices/streamSocketService";
import { LiveScreenContainer } from "./LiveScreen.styled";
import { useEffect, useRef } from "react";

const LiveScreen = ( { liveSession} ) => {

    const videoRef = useRef(null);

    useEffect(() => {
        view(liveSession.id, videoRef)
    })
    return (
        <LiveScreenContainer>
            <video ref={ videoRef } autoPlay controls></video>
            <div className="live">live</div>
        </LiveScreenContainer>
    )
}

export default LiveScreen;
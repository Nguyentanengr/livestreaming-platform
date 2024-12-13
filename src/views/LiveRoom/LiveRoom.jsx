import { useLocation, useParams } from "react-router-dom";
import { LiveRoomContainer } from "./LiveRoom.styled";

import LiveChat from "../../components/LiveChat/LiveChat";


import LiveScreen from "../../components/LiveScreen/LiveScreen";
import LiveInfo from "../../components/LiveInfo/LiveInfo";
import LiveAuthor from "../../components/LiveAuthor/LiveAuthor";
import LiveSponsor from "../../components/LiveSponsor/LiveSponsor";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { view } from "../../services/socketServices/streamSocketService";

const LiveRoom = () => {

    const videoRef = useRef(null);
    const { id } = useParams();
    const { liveSessions } = useSelector((state) => state.liveSession);
    const [liveSession, setLiveSession] = useState(liveSessions.find(l => l.id === id) || null);
    
    useEffect(() => {
        if (liveSession) {
            view(liveSession.id, videoRef);
        }
    }, [liveSession])
    
    return (
        <LiveRoomContainer>
            <div className="live">
                <LiveScreen videoRef={videoRef} />
                <LiveInfo liveSession = {liveSession} />                
                <LiveAuthor liveSession = {liveSession} />
                <LiveSponsor liveSession = {liveSession} />
            </div>
            <LiveChat />

        </LiveRoomContainer>
    );
};

export default LiveRoom;
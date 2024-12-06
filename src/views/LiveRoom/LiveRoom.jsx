import { useLocation, useParams } from "react-router-dom";
import { LiveRoomContainer } from "./LiveRoom.styled";

import LiveChat from "../../components/LiveChat/LiveChat";


import LiveScreen from "../../components/LiveScreen/LiveScreen";
import LiveInfo from "../../components/LiveInfo/LiveInfo";
import LiveAuthor from "../../components/LiveAuthor/LiveAuthor";
import LiveSponsor from "../../components/LiveSponsor/LiveSponsor";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LiveRoom = () => {

    const { id } = useParams();
    const { liveSessions } = useSelector((state) => state.liveSession);
    const [liveSession, setLiveSession] = useState(null);

    useEffect(() => {
        const foundSession = liveSessions.find((l) => l.id === id);
        setLiveSession(foundSession || null);
    }, [liveSessions, id])
    
    return (
        <LiveRoomContainer>
            <div className="live">
                <LiveScreen liveSession = {liveSession} />
                <LiveInfo liveSession = {liveSession} />                
                <LiveAuthor liveSession = {liveSession} />
                <LiveSponsor liveSession = {liveSession} />
            </div>
            <LiveChat />

        </LiveRoomContainer>
    );
};

export default LiveRoom;
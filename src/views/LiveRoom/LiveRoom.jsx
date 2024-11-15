import { useLocation, useParams } from "react-router-dom";
import { LiveRoomContainer } from "./LiveRoom.styled";

import LiveChat from "../../components/LiveChat/LiveChat";


import LiveScreen from "../../components/LiveScreen/LiveScreen";
import LiveInfo from "../../components/LiveInfo/LiveInfo";
import LiveAuthor from "../../components/LiveAuthor/LiveAuthor";
import LiveSponsor from "../../components/LiveSponsor/LiveSponsor";

const LiveRoom = () => {

    const namepath = useLocation();

    return (
        <LiveRoomContainer>
            <div className="live">
                <LiveScreen />
                <LiveInfo />                
                <LiveAuthor />
                <LiveSponsor />
            </div>
            <LiveChat />

        </LiveRoomContainer>
    );
};

export default LiveRoom;
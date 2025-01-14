import { StatusLiveContainer } from "./StatusLive.styled"
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../commons/Button";
import Screen from "../../commons/Screen";
import video from "/videos/streamvideo8.mp4";
import Thumbnail from "../../commons/Thumbnail";
import { useSelector } from "react-redux";

const StatusLive = () => {

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    return (
        <StatusLiveContainer>
            <div className="noti-container">
                <div className="banner">
                    <Thumbnail
                        src={user.thumbnail}
                        onclick={() => navigate(`/profile/${user.username}`)}
                        size="vvlarge"
                    />
                    <div className="text">
                        <Button styles="medium" color={Theme.dark} title="OFFLINE" />
                        <div className="noti">Ripcode444 is offline</div>
                    </div>
                </div>
                <div className="turn-on"><Icons.Notification className="noti-icon" /> Turn on Notifications</div>
            </div>
            <div className="live-screen">
                <Screen videoRef={videoRef} isPlay={false} />
                <div className="banner"><Icons.HotLive className="icon" />
                    offline
                </div>
            </div>
        </StatusLiveContainer>
    );
}

export default StatusLive;
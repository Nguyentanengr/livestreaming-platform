import { StatusLiveContainer } from "./StatusLive.styled"
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import { useEffect, useRef } from "react";
import Button from "../../commons/Button";
import Screen from "../../commons/Screen";
import video from "/videos/streamvideo8.mp4";

const StatusLive = () => {

    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.src = video;
    }, []);

    return (
        <StatusLiveContainer>
            <div className="noti-container">
                <div className="banner">
                    <Button styles="small" color={Theme.dark} title="OFFLINE" />
                    <div className="noti">Ripcode444 is offline</div>
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
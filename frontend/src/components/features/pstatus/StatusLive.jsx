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
    const { myProfile } = useSelector((state) => state.profile);

    return (
        <StatusLiveContainer>
            <div className="noti-container">
                <div className="banner">
                    <Thumbnail
                        src={myProfile.avatar}
                        onclick={() => { }}
                        size="vvlarge"
                    />
                    <div className="text">
                        <Button styles="small" color={myProfile.isStreaming ? Theme.hotRed : Theme.dark} title={`${myProfile.isStreaming ? 'ONLINE' : 'OFFLINE'}`} />
                        <div className="noti">{myProfile.username} is {`${myProfile.isStreaming ? 'online' : 'offline'}`}</div>
                    </div>
                </div>
                <div className="turn-on"><Icons.Notification className="noti-icon" /> Turn on Notifications</div>
            </div>
            <div className="live-screen">
                <Screen videoRef={videoRef} isPlay={false} />
                <div className="banner"><Icons.HotLive className="icon" />
                    {`${myProfile.isStreaming ? 'online' : 'offline'}`}
                </div>
            </div>
        </StatusLiveContainer>
    );
}

export default StatusLive;
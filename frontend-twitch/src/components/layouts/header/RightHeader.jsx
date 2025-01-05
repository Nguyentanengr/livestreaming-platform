import { RightHeaderContainer } from "./RightHeader.styled";
import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";

import ProfileItem from "../../commons/ProfileItem";
import Thumbnail from "../../commons/Thumbnail";
import Button from "../../commons/Button";
import { useNavigate } from "react-router-dom";
import NotificationBox from "./NotificationBox";

const RightHeader = () => {

    const [exProfile, setExProfile] = useState(false);
    const [exNotification, setExNotification] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [count, setCount] = useState(1);

    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    const navigate = useNavigate();
    const src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5xtiFtIcvJqTpVbMI8K3jVG3tLXolM1fSA&s";
    const name = "Ripcode112";
    
    // Listen to click outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setExProfile(false);
            }

            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setExNotification(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, []);

    return (
        <RightHeaderContainer>
            <div className="action-container">
                {isLogin && <Button color={Theme.highlight} styles="large" title="Login" onclick={() => { navigate("/login") }} />}
                {!isLogin && <div className="notification-container">
                    <div className="notification-icon" onClick={() => { setExNotification(!exNotification) }}>
                        <Icons.Notification />
                        <span className="notification-count">{count < 99 ? count : "99+"}</span>
                    </div>
                    {exNotification && <NotificationBox refer={notificationRef} />}
                </div>}
                <div className="profile-container">
                    <Thumbnail src={src} onclick={() => setExProfile(!exProfile)} />
                    {exProfile && <div className="profile-menu-container"  ref={profileRef}>
                        <div className="avatar-container">
                            <Thumbnail src={src} size="large" onclick={() => navigate("/my-channel")}/>
                            <div className="profile-name">{name}</div>
                        </div>
                        <hr />
                        <div className="profile-menu">
                            <ProfileItem icon={<Icons.Channel />} title="Channel" onclick={() => { navigate("/my-chanel") }} />
                            <ProfileItem icon={<Icons.Creator />} title="Creator" onclick={() => { }} />
                            <ProfileItem icon={<Icons.Analytics />} title="Analytics Dashboard" onclick={() => { }} />
                            <ProfileItem icon={<Icons.Privacy />} title="Privacy" onclick={() => { }} />
                            <hr />
                            <ProfileItem icon={<Icons.Logout />} title="Log Out" onclick={() => { }} />
                        </div>
                    </div>}
                </div>
            </div>

        </RightHeaderContainer>
    )
};

export default RightHeader;
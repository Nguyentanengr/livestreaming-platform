import { RightHeaderContainer } from "./RightHeader.styled";
import { useState } from "react";
import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";

import ProfileItem from "../../commons/ProfileItem";
import Thumbnail from "../../commons/Thumbnail";
import Button from "../../commons/Button";
import { useNavigate } from "react-router-dom";

const RightHeader = () => {

    const [isExpend, setIsExpend] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();
    const src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaS_OPAcHevTbgtze5jxUUyjs6y0tBv__pFQ&s";
    const name = "Ripcode112";

    return (
        <RightHeaderContainer>
            <div className="action-container">
                {isLogin && <Button color={Theme.highlight} styles="large" title="Login" onclick={() => { navigate("/login") }} />}
                {!isLogin && <div className="notification-icon" onClick={() => { setCount(count + 1) }}>
                    <Icons.Notification />
                    <span className="notification-count">{count < 99 ? count : "99+"}</span>
                </div>}
                <div className="profile-container">
                    <Thumbnail src={src} onclick={() => setIsExpend(!isExpend)} />
                    {isExpend && <div className="profile-menu-container">
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
import { useState } from "react";
import { ProfileContainer } from "./Profile.styled"

import { BiUser } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { BsFileBarGraph } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    const [profileStatus, setProfileStatus] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState(true);

    const handleVideoProducerClick = () => {
        setProfileStatus(!profileStatus);
        navigate(`/ripcode12/creator-dashboard`);
    }

    return (
        <ProfileContainer>
            <div className="profile" onClick={() => setProfileStatus(!profileStatus)}>
                <BiUser />
            </div>
            <div className={`profile-menu ${profileStatus ? "show" : ""}`}>
                <div className="menu-box">
                    <div className="self-profile">
                        <div className="pp">
                            <BiUser />
                        </div>
                        <div className="info">
                            <div className="username">ripcode12</div>
                            <div className="status">
                                <div className={`status-icon ${onlineStatus ? "online" : ""}`}>
                                    <FaCircle />
                                </div>
                                <span>{!onlineStatus ? "Offline" : "Online"}</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="menu-list">
                        <ul>
                            <li>
                                <div className="item" onClick={() => handleVideoProducerClick()}>
                                    <BsFileBarGraph /> <span>Creator Dashboard</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </ProfileContainer>
    )
}

export default Profile;
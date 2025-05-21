import { useSelector } from "react-redux";
import { AboutChannelContainer } from "./AboutChannel.styled"

import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon"
import { useEffect, useState } from "react";
import Thumbnail from "../../../components/commons/Thumbnail";
import AccountSettingModal from "./AccountSettingModal";
import EditProfileModal from "./EditProfileModal";
import { convertView } from "../../../utils/convert";
import StreamList from "./StreamList";
import ReelList from "./ReelList";


const AboutChannel = () => {

    const [selectNav, setSelectNav] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSettingModal, setShowSettingModal] = useState(false);

    const { myProfile } = useSelector((state) => state.profile);

    const { myStream } = useSelector((state) => state.myStream);
    const streamsToShow = myStream.streams?.slice(0, myProfile.streamsCount);

    const { myReel } = useSelector((state) => state.myReel);
    const reelsToShow = myReel.reels?.slice(0, myProfile.reelsCount);

    const navigate = useNavigate();

    const navigations = [
        { id: 1, name: "Videos" },
        { id: 2, name: "Reels" },
    ]


    return (
        <AboutChannelContainer>
            <div className="short-info">
                <div className="info">
                    <Thumbnail
                        src={myProfile.avatar}
                        onclick={() => { }}
                        size="vlarge"
                    />
                    <div className="username">
                        {myProfile.username}
                    </div>
                </div>
                <div className="action">
                    {/* <div className="follow-btn">
                        <Icons.HeartEmpty className="fol-icon"/>
                        Follow
                    </div> */}
                    <div className="edit-btn" onClick={() => setShowEditModal(true)} >
                        <Icons.Edit className="edit-icon" />
                        Edit Profile
                    </div>
                    <div className="edit-btn" onClick={() => setShowSettingModal(true)} >
                        <Icons.Setting className="edit-icon" />
                        Account Setting
                    </div>
                </div>

            </div>
            <div className="description-info">
                <div className="description">
                    <div className="fol-vid">
                        <div className="fol">
                            {convertView(myProfile.followersCount)} Followers
                        </div>
                        <Icons.HotLive className="dot" />
                        <div className="vid">
                            {convertView(myProfile.streamsCount)} Videos and {convertView(myProfile.reelsCount)} Reels
                        </div>
                    </div>
                    <div className="des">
                        {myProfile.bio}
                    </div>
                </div>
                <div className="links">
                    {myProfile.link.youtube && (
                        <Link to={myProfile.link.youtube} target="_blank" className="link-item">
                            <Icons.Youtube className="link-icon" />
                            Youtube
                        </Link>
                    )}
                    {myProfile.link.tiktok && (
                        <Link to={myProfile.link.tiktok} target="_blank" className="link-item">
                            <Icons.Tiktok className="link-icon" />
                            TikTok
                        </Link>
                    )}
                    {myProfile.link.discord && (
                        <Link to={myProfile.link.discord} target="_blank" className="link-item">
                            <Icons.Discord className="link-icon" />
                            Discord
                        </Link>
                    )}

                </div>
            </div>
            <div className="store">
                <div className="navigations">
                    {navigations.map(navigation => {
                        let cl = navigation.id == selectNav ? "highlight" : "";
                        return (
                            <div
                                className={`navigation ${cl}`}
                                key={navigation.id}
                                onClick={() => { setSelectNav(navigation.id) }}
                            >
                                {navigation.name}
                                <div className={cl}></div>
                            </div>
                        )
                    })}
                </div>
                <div className="list">
                    {selectNav == 1 && (
                        <div className="stream-collection">
                            <StreamList
                                itemsToShow={streamsToShow}
                            />
                        </div>
                    )}
                    {selectNav == 2 && (
                        <div className="reel-collection">
                            <ReelList
                                itemsToShow={reelsToShow}
                            />
                        </div>
                    )}
                </div>
            </div>
            {showEditModal && (
                <EditProfileModal
                    onClose={() => setShowEditModal(false)}
                />
            )}
            {showSettingModal && (
                <AccountSettingModal
                    onClose={() => setShowSettingModal(false)}
                />
            )}
        </AboutChannelContainer>
    );
}

export default AboutChannel;
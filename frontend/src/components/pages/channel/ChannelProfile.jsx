import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ChannelProfileContainer, StatusLiveContainer, AboutChannelContainer } from "./ChannelProfile.styled";
import { Theme } from "../../../assets/styles/Theme";
import { Icons } from "../../../assets/icons/Icon";
import Button from "../../commons/Button";
import Screen from "../../commons/Screen";
import Thumbnail from "../../commons/Thumbnail";
import video from "/videos/streamvideo8.mp4";
import StreamList from "../../features/pabout/StreamList";
import ReelList from "../../features/pabout/ReelList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedNav } from "../../../stores/slices/channelProfileSlice";
import { convertView } from "../../../utils/convert";
import { getProfile } from "../../../service/api/profileApi";
import { followUserInChannel, getReels, getStreams, unfollowUserInChannel } from "../../../service/api/channelApi";

const ChannelProfile = () => {
    const bgRandom = [Theme.blue, Theme.hotRed, Theme.highlight, Theme.pink, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header, Theme.header];
    const r = Math.floor(Math.random() * bgRandom.length);

    const navigations = [
        { id: 1, name: "Videos" },
        { id: 2, name: "Reels" },
    ]

    const { channelProfile, selectedNav, reels, streams } = useSelector((state) => state.channelProfile);

    const videoRef = useRef(null);
    const dispatch = useDispatch();

    const { username } = useParams();


    const handleClickFollow = () => {
        if (channelProfile.isFollowing) {
            dispatch(unfollowUserInChannel({ username: username }));
        } else {
            dispatch(followUserInChannel({ username: username }));
        }
    }

    useEffect(() => {
        dispatch(getStreams({ username: username, page: 0, size: 100 }));
        dispatch(getReels({ username: username, page: 0, size: 100 }));
    }, [])

    useEffect(() => {
        if (username) dispatch(getProfile({ username: username }));
    }, [username, dispatch]);

    return (
        <ChannelProfileContainer bgColor={bgRandom[r]}>
            <StatusLiveContainer>
                <div className="noti-container">
                    <div className="banner">
                        <Thumbnail
                            src={channelProfile.avatar}
                            onclick={() => { }}
                            size="vvlarge"
                        />
                        <div className="text">
                            <Button
                                styles="small"
                                color={channelProfile.isStreaming ? Theme.hotRed : Theme.dark}
                                title={channelProfile.isStreaming ? "ONLINE" : "OFFLINE"}
                            />
                            <div className="noti">{channelProfile.username} is {channelProfile.isStreaming ? "online" : "offline"}</div>
                        </div>
                    </div>
                    <div className="turn-on">
                        <Icons.Notification className="noti-icon" /> Turn on Notifications
                    </div>
                </div>
                <div className="live-screen">
                    <Screen videoRef={videoRef} isPlay={false} />
                    <div className="banner">
                        <Icons.HotLive className="icon" />
                        {channelProfile.isStreaming ? "online" : "offline"}
                    </div>
                </div>
            </StatusLiveContainer>
            <AboutChannelContainer>
                <div className="short-info">
                    <div className="info">
                        <Thumbnail
                            src={channelProfile.avatar}
                            onclick={() => { }}
                            size="vlarge"
                        />
                        <div className="username">{channelProfile.username}</div>
                    </div>
                    <div className="action">
                        { channelProfile.isFollowing ?
                            <Button
                                color={Theme.hover}
                                text={Theme.dark}
                                title={"Unfollow"}
                                onclick={handleClickFollow}
                            /> :
                            <Button
                                color={Theme.highlight}
                                title={"Follow"}
                                onclick={handleClickFollow}
                            />
                        }
                    </div>
                </div>
                <div className="description-info">
                    <div className="description">
                        <div className="fol-vid">
                            <div className="fol">{convertView(channelProfile.followersCount)} Followers</div>
                            <Icons.HotLive className="dot" />
                            <div className="vid">
                                {convertView(channelProfile.streamsCount)} Videos and {convertView(channelProfile.reelsCount)} Reels
                            </div>
                        </div>
                        <div className="des">{channelProfile.bio}</div>
                    </div>
                    <div className="links">
                        {channelProfile.link.youtube && (
                            <Link to={channelProfile.link.youtube} target="_blank" className="link-item">
                                <Icons.Youtube className="link-icon" /> Youtube
                            </Link>
                        )}
                        {channelProfile.link.tiktok && (
                            <Link to={channelProfile.link.tiktok} target="_blank" className="link-item">
                                <Icons.Tiktok className="link-icon" /> TikTok
                            </Link>
                        )}
                        {channelProfile.link.discord && (
                            <Link to={channelProfile.link.discord} target="_blank" className="link-item">
                                <Icons.Discord className="link-icon" /> Discord
                            </Link>
                        )}
                    </div>
                </div>

                <div className="store">
                    <div className="navigations">
                        {navigations.map(navigation => {
                            let cl = navigation.id == selectedNav ? "highlight" : "";
                            return (
                                <div
                                    className={`navigation ${cl}`}
                                    key={navigation.id}
                                    onClick={() => { dispatch(setSelectedNav(navigation.id)) }}
                                >
                                    {navigation.name}
                                    <div className={cl}></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="list">
                        {selectedNav == 1 && (
                            <div className="stream-collection">
                                <StreamList
                                    itemsToShow={streams}
                                />
                            </div>
                        )}
                        {selectedNav == 2 && (
                            <div className="reel-collection">
                                <ReelList
                                    itemsToShow={reels}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </AboutChannelContainer>
        </ChannelProfileContainer>
    );
};

export default ChannelProfile;
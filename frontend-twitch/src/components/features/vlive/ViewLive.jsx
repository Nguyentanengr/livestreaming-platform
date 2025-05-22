import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";
import Button from "../../commons/Button";
import Thumbnail from "../../commons/Thumbnail";
import { ViewLiveContainer } from "./ViewLive.styled";
import { convertView, convertDuration } from "../../../utils/convert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { followUserInStream, unfollowUserInStream } from "../../../service/api/userApi";

const ViewLive = () => {
    const { selectedStream } = useSelector((state) => state.stream);
    const { profile } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const links = profile?.link
        ? Object.entries(profile.link)
            .filter(([_, url]) => url)
            .map(([name, url], index) => ({
                id: index + 1,
                icon: Icons[name.charAt(0).toUpperCase() + name.slice(1)] || Icons.Link,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                link: url,
            }))
        : [];

    const duration = selectedStream?.endedAt && selectedStream?.startedAt
        ? Math.floor((new Date(selectedStream.endedAt) - new Date(selectedStream.startedAt)) / 1000)
        : 0;

    const handleClickFollow = () => {
        if (profile?.isFollowing) {
            console.log("dispatch unfollow")
            dispatch(unfollowUserInStream({ username: profile.username}));
        } else {
            console.log("dispath follow")
            dispatch(followUserInStream({ username: profile.username}));
        }
    };

    return (
        <ViewLiveContainer>
            <div className="about-live">
                <div className="thumb-title">
                    <div className="thumb-container">
                        <Thumbnail src={selectedStream?.thumbnail || ""} size="vlarge" />
                        {!selectedStream?.endedAt && <div className="span-live">LIVE</div>}
                    </div>
                    <div className="title-container">
                        <div className="title">{selectedStream?.title || "Loading..."}</div>
                        <div className="username">
                            {selectedStream?.user?.username || "Unknown"}
                            {(
                                <div className="check-icon">
                                    <Icons.FollowedPlus />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="follow-container">
                    <div className="view-time">
                        <div className="view">
                            {selectedStream
                                ? convertView(selectedStream.endedAt ? selectedStream.totalViewers : selectedStream.viewersCount)
                                : 0} {selectedStream?.endedAt ? "Views" : "Viewers"}
                        </div>
                        <Icons.HotLive className="dot" />
                        <div className="time">
                            {selectedStream?.endedAt ? convertDuration(duration) : "Live"}
                        </div>
                    </div>
                    <div className="btn-container">
                        {profile?.isFollowing ? <Button
                            color={Theme.hover}
                            title={"Unfollow"}
                            text={Theme.dark}
                            onclick={handleClickFollow}
                        /> : <Button
                            color={Theme.highlight}
                            title={"Follow"}
                            onclick={handleClickFollow}
                        />}
                    </div>
                </div>
            </div>
            <div className="about-user">
                <div className="description">
                    <div className="fol-vid">
                        <div className="fol">{convertView(profile?.followersCount || 0)} Followers</div>
                        <Icons.HotLive className="dot" />
                        <div className="vid">About {selectedStream?.user?.username || "user"}</div>
                    </div>
                    <div className="des">{profile?.bio || "No bio available."}</div>
                </div>
                <div className="links">
                    {links.map((link) => (
                        <a className="link-item" key={link.id} href={link.link} target="_blank" rel="noopener noreferrer">
                            <link.icon className="link-icon" />
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </ViewLiveContainer>
    );
};

export default ViewLive;
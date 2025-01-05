import { useSelector } from "react-redux";
import { AboutChannelContainer } from "./AboutChannel.styled"

import Thumbnail from "../../../components/commons/Thumbnail";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons/Icon"


const AboutChannel = () => {

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const links = [
        {id: 1, icon: Icons.Youtube, name:"Youtube", link: "http://youtube.com"},
        {id: 2, icon: Icons.Discord, name:"Discord", link: "http://discord.com"},
        {id: 3, icon: Icons.Tiktok, name:"Tiktok", link: "http://tiktok.com"},
    ];

    return (
        <AboutChannelContainer>
            <div className="short-info">
                <div className="info">
                    <Thumbnail
                        src={user.thumbnail}
                        onclick={() => navigate(`/profile/${user.username}`)}
                        size="vlarge"
                    />
                    <div className="username">
                        {user.username}
                    </div>
                </div>
                <div className="action">
                    <div className="follow-btn">
                        <Icons.Like className="fol-icon"/>
                        Follow
                    </div>
                </div>

            </div>
            <div className="description-info">
                <div className="description">
                    <div className="fol-vid">
                        <div className="fol">
                            448K Follow
                        </div>
                        <Icons.HotLive className="dot"/>
                        <div className="vid">
                            48 Videos and Reels
                        </div>
                    </div>
                    <div className="des">
                    Australian streamer by the name of Zane playing a mixture of games in my spare time. Will usually stream 1-2 group sessions and 4-5 solo sessions per week. MUSIC BY youtube.com/@fantasylofi → https://ffm.bio/bitsandhits
                    </div>
                </div>
                <div className="links">
                    {links.map((link, index) => {
                        return <div className="link-item">
                            <link.icon className="link-icon" />
                            {link.name}
                        </div>
                    })}

                </div>
            </div>
            <div className="store">
                <div className="navigations">
                    <div className="video">

                    </div>
                    <div className="reel">

                    </div>
                </div>
            </div>
        </AboutChannelContainer>
    );
}

export default AboutChannel;
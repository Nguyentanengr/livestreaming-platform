import { useLocation, useParams } from "react-router-dom";
import { StyledLiveStream } from "./StyledLiveStream.styled";
import video from "/videos/streamvideo1.mp4";

import { BiHeart } from "react-icons/bi";
import { FaEllipsisV } from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsDiscord } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
 
const LiveStream = () => {

    const namepath = useLocation();
    const username = namepath.pathname.slice(1);
    const tags = ["leansixsigma", "2024", "simplilearn"];

    return (
        <StyledLiveStream>
            <div className="livestream-box">
                {/* Video Live */}
                <div className="live">
                    <div className="live-info">
                        <video src={video} controls></video>
                    </div>


                    {/* Thông tin phiên live */}
                    <div className="profile-info">
                        <div className="pp">
                            <img src="https://yt3.ggpht.com/ux6IbjY66j8gr8n-71aY9hwR1OGPmxweHWEYsDr-RxX_VbX1cZoReGi1JyKN-fDJ7h-Mqqn_Gw=s48-c-k-c0x00ffffff-no-rj" alt="" />
                            <div className="name">frenzy_riz <BiBadgeCheck className="check" /></div>
                        </div>
                        <div className="info-detail">
                            <div className="title">
                                Mark Selby vs Shaun Murphy Champion of Champions 2024 Round 1 Live Match HD 60 FPS
                            </div>
                            <div className="tags">
                                {tags.map((tag, index) => {
                                    return <div className="tag" key={index}>{tag}</div>
                                })}
                            </div>
                            <div className="viewers"><BiUser className="user" />4,771</div>
                        </div>
                        <div className="about-chanel">
                            <div className="follow">
                                <button><BiHeart className="icon-follow" />Follow</button>
                            </div>
                            <div className="report">
                                <FaEllipsisV className="icon-report" />
                            </div>
                        </div>
                    </div>

                    {/* Thông tin tác giả */}
                    <div className="about-streamer">
                        <h1>About frenzy_riz</h1>
                        <div className="info-box">
                            <div className="followers">
                                7.2M Followers
                            </div>
                            <p>
                                Hello Snooker Fans! Welcome to our community dedicated to live snooker matches. Whether you're a seasoned player or just love watching the game, you've found your new home.
                                Hello Snooker Fans! Welcome to our community dedicated to live snooker matches. Whether you're a seasoned player or just love watching the game, you've found your new home.
                            </p>
                            <hr className="custom-hr"/>
                            <div className="social-app">
                                <div className="label">
                                    <a href="https://discord.com/"><BsDiscord className="icon" />Discord Group</a>
                                </div>
                                <div className="label">
                                    <a href="https://www.youtube.com/"><BsYoutube className="icon" />Youtube Channel</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nhãn hàng tài trợ */}
                    <div className="sponsored-by">
                        <h1>Sponsored by</h1>
                        <div className="sponsors">
                            <div className="sponsor">
                                <img src="https://cdn.mos.cms.futurecdn.net/3xshZ9ZSF7vvXKk6TQtJvd.png" alt="" />
                            </div>
                            <div className="sponsorer">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4tdsIfUp6JK3VxhikF40-Y4_DWpaymVNZg&s" alt="" />
                            </div>
                            <div className="sponsorer">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI177r-i_Rgi94UIszQjgNg8km8qdEa0szCA&s" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat">
                    <div className="header-chat">
                        Chat header
                    </div>
                    <div className="message-box">
                        Message Box
                    </div>
                    <div className="send-message">
                        Send message
                    </div>
                </div>

            </div>
        </StyledLiveStream>
    )
}

export default LiveStream;
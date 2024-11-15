import { useNavigate } from "react-router-dom";
import { ChanelContainer } from "./Chanel.styled";

import { FaEllipsisV } from "react-icons/fa";

const Chanel = ({ user }) => {

    const navigate = useNavigate();

    const handleLiveScreenClick = (username) => {
        navigate(`/${username.toLowerCase().replace(/ /g, '-')}`);
    }

    return (
        <ChanelContainer>
            <div className="channel-box">
                <div className="live-screen" onClick={() => handleLiveScreenClick(user.username)}>
                    <img src={user.liveScreen} alt="" />
                    <div className={`live ${false ? "invisible" : ""}`}>live</div>
                    <div className={`viewers ${false ? "invisible" : ""}`}>{user.viewers} viewers</div>
                    {/* visible video in here */}
                </div>
                <div className="channel-info">
                    <div className="left">
                        <div className="pp">
                            <img src={user.pp} alt="" />
                        </div>
                        <div className="profile-info">
                            <div className="title">{user.title}</div>
                            <div className="username">{user.username}</div>
                            <div className="game">{user.game}</div>
                            <div className="tags">
                                {user.tag.map((tag, index) => {
                                    return <div className="tag" key={index}>{tag}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <FaEllipsisV />
                    </div>
                </div>
            </div>
        </ChanelContainer>
    )
}

export default Chanel;
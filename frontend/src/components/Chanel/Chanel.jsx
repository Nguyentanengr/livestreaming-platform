import { useNavigate } from "react-router-dom";
import { ChanelContainer } from "./Chanel.styled";

import { FaEllipsisV } from "react-icons/fa";

const Chanel = ({ liveSession }) => {

    const navigate = useNavigate();

    const handleLiveScreenClick = (id) => {
        navigate(`/${id}`);
    }

    return (
        <ChanelContainer>
            <div className="channel-box">
                <div className="live-screen" onClick={() => handleLiveScreenClick(liveSession.id)}>
                    <img src={liveSession.liveScreen} alt="" />
                    <div className={`live ${false ? "invisible" : ""}`}>live</div>
                    <div className={`viewers ${false ? "invisible" : ""}`}>{liveSession.viewers} viewers</div>
                    {/* visible video in here */}
                </div>
                <div className="channel-info">
                    <div className="left">
                        <div className="pp">
                            <img src={liveSession.pp} alt="" />
                        </div>
                        <div className="profile-info">
                            <div className="title">{liveSession.title}</div>
                            <div className="username">{liveSession.username}</div>
                            <div className="game">{liveSession.game}</div>
                            <div className="tags">
                                {liveSession.tags.map((tag, index) => {
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
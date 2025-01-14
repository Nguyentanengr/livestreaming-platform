import { Icons } from "../../../assets/icons/Icon";
import { Theme } from "../../../assets/styles/Theme";
import Button from "../../commons/Button";
import Thumbnail from "../../commons/Thumbnail";
import { ViewLiveContainer } from "./ViewLive.styled"

const ViewLive = () => {

    const links = [
        { id: 1, icon: Icons.Youtube, name: "Youtube", link: "http://youtube.com" },
        { id: 2, icon: Icons.Discord, name: "Discord", link: "http://discord.com" },
        { id: 3, icon: Icons.Tiktok, name: "Tiktok", link: "http://tiktok.com" },
    ];

    return (
        <ViewLiveContainer>
            <div className="about-live">
                <div className="thumb-title">
                    <div className="thumb-container">
                        <Thumbnail src={"/images/categories/game11.jpg"} size="vlarge" />
                        <div className="span-live">Live</div>
                    </div>
                    <div className="title-container">
                        <div className="title">
                            [DROPS] ✖ Grinding for GM ✖ Rank: PLAT 3 [Last Season: Diamond 2] 💎 ✖ !split !latestvideo
                        </div>
                        <div className="username">
                            LeolNatdo
                            <div className="check-icon">
                                <Icons.FollowedPlus />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="follow-container">
                    <div className="view-time">
                        <div className="view">
                            106,090 Viewers
                        </div>
                        <Icons.HotLive className="dot" />
                        <div className="time">
                            3:24:46
                        </div>
                    </div>
                    <div className="btn-container">
                        <Button color={Theme.highlight} title="Follow" onclick={() => { }} />
                    </div>
                </div>
            </div>
            <div className="about-user">
                <div className="description">
                    <div className="fol-vid">
                        <div className="fol">
                            448K Follow
                        </div>
                        <Icons.HotLive className="dot" />
                        <div className="vid">
                            About stream
                        </div>
                    </div>
                    <div className="des">
                        Vua về nhì Độ Mixi giữ vững phong độ trước kèo Liar's bar bít tết cuối năm cùng anh em.
                        <hr />
                        Lịch Live:
                        <hr />
                        22:15-23:59 hàng ngày trên Youtube.
                        <hr />
                        0:01-03:00 hàng ngày trên: https://svip.nimo.tv/mixi
                        <hr />
                        (Thứ Bảy & Chủ Nhật chỉ live bên nimo.tv/mixi vào 23:00 )
                        <hr />
                        -------------------------------------------------------------------------------------------------------------
                        <hr />
                        DONATE:
                        <hr />
                        https://streamlabs.com/mixigamingoffi...
                        <hr />
                        https://playerduo.net/mixigaming
                        <hr />
                        https://qr.wescan.vn/Mixi
                        <hr />
                        ►Trang web chính thức để các bạn xem lại video và livestream: https://mixigaming.com/
                        <hr />
                        ► Fanpage chính thức:   / mixigaming
                        <hr />
                        ► Facebook cá nhân:   / dophung89
                        <hr />
                        ► Instagram:   / dochet1989
                        <hr />
                        ► Link Discord giao lưu:   / discord
                        <hr />
                        ► Link Group FB:    / mixigaming
                        <hr />
                        ► Email liên hệ công việc: works@mixigaming.com
                        <hr />
                        -----------------------------------------------------------------------------------------------------------------
                        <hr />
                        ► Shop game bản quyền số 1 Việt Nam: divineshop.vn
                    </div>
                </div>
                <div className="links">
                    {links.map((link, index) => {
                        return <div className="link-item" key={index}>
                            <link.icon className="link-icon" />
                            {link.name}
                        </div>
                    })}

                </div>
            </div>


        </ViewLiveContainer>
    );
};

export default ViewLive;
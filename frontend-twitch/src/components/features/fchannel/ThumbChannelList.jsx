import ThumbChannelItem from "./ThumbChannelItem";
import { ThumbChannelListContainer } from "./ThumbChannelList.styled"


const ThumbChannelList = () => {

    const users = [
        {id: 1, username:"Ambience Ramutatus Alikuten", thumbnail: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg", isLive: true },
        {id: 2, username:"Taryn", thumbnail: "https://tq6.mediacdn.vn/thumb_w/640/133514250583805952/2022/5/2/king-one-punch-man-feature-1651498492529973254119.jpg", isLive: true },
        {id: 3, username:"Chill Guy", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE1KBCPl8x447HdgdioRuwZWGdQSJlBuQCNQ&s", isLive: true },
        {id: 4, username:"Cozy Craft", thumbnail: "https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg", isLive: true },
        {id: 5, username:"Ariward", thumbnail: "https://thanhnien.mediacdn.vn/Uploaded/nguyenvan/2022_08_17/bm-4-7521.png", isLive: false },
        {id: 6, username:"Hip Z", thumbnail: "https://phongvu.vn/cong-nghe/wp-content/uploads/2024/12/squid-game-2-2-1024x640.jpg", isLive: true },
        {id: 7, username:"Rata Hiz", thumbnail: "https://media-cdn-v2.laodong.vn/storage/newsportal/2022/7/3/1063715/Poster-Cua-Money-Hei.jpg", isLive: false },
        {id: 8, username:"Big Mouse", thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_8M9uhEsidwCiAP1G4b_NEH9nQmewJ2bjQ&s", isLive: true },
        // {id: 9, username:"LionRatio", thumbnail: "https://play-lh.googleusercontent.com/jtzzODetraO9s6lfg0WX4T8jKOSMpm4iHHqNbwKNjuEJwQqyQqXUIu7lOFsoe14i1cT-16t_FocBwmLp13I", isLive: false },
        // {id: 10, username:"Latus", thumbnail: "https://tq6.mediacdn.vn/thumb_w/640/133514250583805952/2022/5/2/king-one-punch-man-feature-1651498492529973254119.jpg", isLive: true },
    ];

    return (
        <ThumbChannelListContainer>
            {users.map(user => {
                return (<div className="item" key={user.id}>
                    <ThumbChannelItem item={user} />
                </div>);
            })}
        </ThumbChannelListContainer>
    );
};

export default ThumbChannelList;

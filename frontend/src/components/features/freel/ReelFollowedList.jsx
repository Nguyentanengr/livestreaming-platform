
import { useState } from 'react';
import { ReelFollowedListContainer } from './ReelFollowedList.styled';
import thumbnail1 from "/images/games/game-eft.jpg";
import ReelFollowedItem from './ReelFollowedItem';


const ReelFollowedList = () => {

    const [reels, setReels] = useState([
        {
            reelId: 1,
            username: "Ambience",
            titleReel: "Highlight for the Valorant",
            thumbnail: thumbnail1,
            duration: "01:20"
        },
        {
            reelId: 2,
            username: "cocoNut",
            titleReel: "Short video for funny",
            thumbnail: thumbnail1,
            duration: "04:53"
        },
        {
            reelId: 3,
            username: "Butchihoa",
            titleReel: "Gunny hit last monday",
            thumbnail: thumbnail1,
            duration: "01:20"
        },
        {
            reelId: 4,
            username: "RobiKy",
            titleReel: "Gunny hit last monday",
            thumbnail: thumbnail1,
            duration: "04:19"
        },
        {
            reelId: 4,
            username: "gomesto",
            titleReel: "Football with my friend",
            thumbnail: thumbnail1,
            duration: "01:20"
        },
    ]);

    return (
        <ReelFollowedListContainer>
            <div className="title-area">
                Related Reels
            </div>
            <div className="reel-list-cnt">
                {reels.map((reel) => {
                    return <div className='reel-item' key={reel.id}>
                        <ReelFollowedItem reel={reel}/>
                    </div>
                })}
            </div>
        </ReelFollowedListContainer>
    );
};

export default ReelFollowedList;
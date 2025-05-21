import { useState } from 'react';
import { StreamerRecommendListContainer } from './StreamerRecommendList.styled';
import Button from '../../commons/Button';
import { Theme } from '../../../assets/styles/Theme';
import Thumbnail from '../../commons/Thumbnail';
import StreamerRecommendItem from './StreamerRecommendItem';

const StreamerRecommendList = ({ title }) => {

    const [users, setUsers] = useState([
        {
            userId: 1,
            username: "ProGamer123",
            followers: "245K",
            thumbail: "/images/avatar-default.jpeg",
        },
        {
            userId: 2,
            username: "StreamQueen",
            followers: "1.2M",
            thumbail: "/images/avatar-default.jpeg",
        },
        {
            userId: 3,
            username: "GameMaster",
            followers: " 567K",
            thumbail: "/images/avatar-default.jpeg",
        },
        {
            userId: 4,
            username: "EpicStreams",
            followers: "89K",
            thumbail: "/images/avatar-default.jpeg",
        },
        {
            userId: 5,
            username: "StreamQueen",
            followers: "1.2M",
            thumbail: "/images/avatar-default.jpeg",
        },
        {
            userId: 6,
            username: "StreamQueen",
            followers: "1.2M",
            thumbail: "/images/avatar-default.jpeg",
        },
    ]);




    return (
        <StreamerRecommendListContainer>
            <div className="title">
                {title}
            </div>
            <div className="recomment-area">
                {users.map((user) => (
                    <StreamerRecommendItem user={user} key={user.userId} />
                ))}

            </div>
        </StreamerRecommendListContainer>
    );
};

export default StreamerRecommendList;
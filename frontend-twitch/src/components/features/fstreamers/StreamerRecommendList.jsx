import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StreamerRecommendListContainer } from './StreamerRecommendList.styled';
import StreamerRecommendItem from './StreamerRecommendItem';
import { getFollowedUsers } from '../../../service/api/followApi';

const StreamerRecommendList = ({ title }) => {
    const dispatch = useDispatch();
    const { followedUsers, loading, error } = useSelector((state) => state.follow);

    useEffect(() => {
        dispatch(getFollowedUsers({ page: 0, size: 10 }));
    }, [dispatch]);

    if (loading) {
        return <StreamerRecommendListContainer>Loading...</StreamerRecommendListContainer>;
    }

    if (error) {
        return <StreamerRecommendListContainer>Error: {error.message}</StreamerRecommendListContainer>;
    }

    return (
        <StreamerRecommendListContainer>
            <div className="title">{title}</div>
            <div className="recomment-area">
                {followedUsers.map((user) => (
                    <StreamerRecommendItem user={user} key={user.id} />
                ))}
            </div>
        </StreamerRecommendListContainer>
    );
};

export default StreamerRecommendList;
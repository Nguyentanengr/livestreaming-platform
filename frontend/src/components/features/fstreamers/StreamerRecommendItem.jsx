import { useDispatch } from 'react-redux';
import { Theme } from '../../../assets/styles/Theme';
import Button from '../../commons/Button';
import Thumbnail from '../../commons/Thumbnail';
import { StreamerRecommendItemContainer } from './StreamerRecommendItem.styled';
import { useNavigate } from 'react-router-dom';
import { followUserInFollowing, unfollowUserInFollowing } from '../../../service/api/followApi';

const StreamerRecommendItem = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickFollow = () => {
        if (localStorage.getItem("accessToken")) {
            if (user.isFollowing) {
                dispatch(unfollowUserInFollowing({ username: user.username}));
            }
            else {
                dispatch(followUserInFollowing({ username: user.username}));
            }
        } else {
            console.log('Please log in to follow this user');
        }
    };

    const handleAvatarClick = (username) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === username) {
            navigate('/you')
        } else {
            navigate(`/channel/${username}`);
        }
    }

    return (
        <StreamerRecommendItemContainer>
            <div className="info">
                <div className="thumbnail">
                    <Thumbnail src={user.avatar} onclick={() => handleAvatarClick(user.username)} size="large" />
                </div>
                <div className="info-detail">
                    <div className="username">{user.username}</div>
                    <div className="followers">{user.followersCount} followers</div>
                </div>
            </div>
            <div className="action">
                {user.isFollowing ?  <Button
                    color={Theme.hover}
                    title={"Unfollow"}
                    styles="medium"
                    onclick={handleClickFollow}
                    text={Theme.dark}
                /> :  <Button
                    color={Theme.highlight}
                    title={"Follow"}
                    styles="medium"
                    onclick={handleClickFollow}
                />}
            </div>
        </StreamerRecommendItemContainer>
    );
};

export default StreamerRecommendItem;
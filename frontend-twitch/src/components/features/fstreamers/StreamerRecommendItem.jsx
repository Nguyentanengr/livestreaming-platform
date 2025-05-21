import { Theme } from '../../../assets/styles/Theme';
import Button from '../../commons/Button';
import Thumbnail from '../../commons/Thumbnail';
import { StreamerRecommendItemContainer } from './StreamerRecommendItem.styled';

const StreamerRecommendItem = ({ user }) => {

    const handleClickFollow = (e) => {

    }
    const handleClickThumbnail = () => {

    }

    return (
        <StreamerRecommendItemContainer>
            <div className="info">
                <div className="thumbnail">
                    <Thumbnail src={user.thumbail} onclick={handleClickThumbnail} size={"large"} />
                </div>
                <div className="info-detail">
                    <div className="username">
                        {user.username}
                    </div>
                    <div className="followers">
                        {user.followers} followers
                    </div>
                </div>
            </div>
            <div className="action">
                <Button color={Theme.highlight} title={"Follow"} styles={"medium"} onclick={handleClickFollow} />
            </div>
        </StreamerRecommendItemContainer>
    );
};

export default StreamerRecommendItem;
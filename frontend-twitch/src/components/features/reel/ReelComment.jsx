
import { useSelector } from "react-redux";
import { ReelCommentContainer } from "./ReelComment.styled";
import { Icons } from "../../../assets/icons/Icon";
import HeaderBox from "../../commons/HeaderBox";
import SendComment from "../../commons/SendComment";
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";


const ReelComment = ({ reel }) => {

    const navigate = useNavigate();
    const comments = useSelector(state => state.comment.comments);


    return (
        <ReelCommentContainer>
            <div className="comment-container">
                <HeaderBox title="Comments" />
                <div className="line"></div>
                <div className="comment-list-container">
                    {comments.map((comment) => (
                        <div className="comment-item" key={comment.id}>
                            <Thumbnail className="thumbnail"
                                src={comment.avatar}
                                onclick={() => navigate(`/profile/${comment.username}`)} />
                            <div className="comment-info">
                                <div className="username" onClick={() => navigate(`/profile/${comment.username}`)}>
                                    {comment.username}
                                </div>
                                <div className="content">
                                    {comment.content}
                                </div>
                                <div className="sub-info">
                                    <div className="timestamp">
                                        {comment.timestamp}
                                    </div>
                                    <div className="like-count">
                                        <Icons.Like />
                                        {comment.likeCount}
                                    </div>
                                    <div className="reply-btn">
                                        reply
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <SendComment />
            </div>
        </ReelCommentContainer>
    );
};

export default ReelComment;


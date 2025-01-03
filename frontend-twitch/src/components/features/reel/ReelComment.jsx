
import { useDispatch, useSelector } from "react-redux";
import { ReelCommentContainer } from "./ReelComment.styled";
import { Icons } from "../../../assets/icons/Icon";
import HeaderBox from "../../commons/HeaderBox";
import SendComment from "../../commons/SendComment";
import Thumbnail from "../../commons/Thumbnail";
import { useNavigate } from "react-router-dom";
import { addComment } from "../../../stores/slices/commentSlice";
import { useRef } from "react";


const ReelComment = ({ reel }) => {

    const commentRef = useRef(null);
    const itemRefs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comments = useSelector(state => state.comment.comments);

    const sendComment = (content) => {
        if (!content.trim()) return;

        const newComment = {
            id: comments.length + 1,
            content: content,
            username:  "Nguyen Tan",
            avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg",
            timestamp: "just now",
            likeCount: 0,
            videoId: 1,
            replyCount: 0,
        }

        dispatch(addComment(newComment));

        setTimeout(() => { 
            commentRef.current.scrollTo({
                top: itemRefs.current[newComment.id].offsetTop,
                behavior: "smooth",
            });
        }, 100)
    };


    return (
        <ReelCommentContainer>
            <div className="comment-container">
                <HeaderBox title="Comments" />
                <div className="line"></div>
                <div className="comment-list-container" ref={commentRef}>
                    {comments.map((comment) => (
                        <div className="comment-item" key={comment.id} ref={el => itemRefs.current[comment.id] = el}>
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
                <SendComment onSendComment={sendComment}/>
            </div>
        </ReelCommentContainer>
    );
};

export default ReelComment;


import { useDispatch, useSelector } from 'react-redux';
import { ReelCommentContainer } from './ReelComment.styled';
import { Icons } from '../../../assets/icons/Icon';
import HeaderBox from '../../commons/HeaderBox';
import SendComment from '../../commons/SendComment';
import Thumbnail from '../../commons/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getComments, createComment, deleteComment, likeComment, unlikeComment } from '../../../service/api/reelApi';
import { resetComments } from '../../../stores/slices/commentSlice';
import { convertTimeToTimeAgo } from '../../../utils/convert';

const ReelComment = ({ reel }) => {
    const commentRef = useRef(null);
    const itemRefs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { comments, currentPage, hasMore, isLoading, error } = useSelector((state) => state.comment);
    const currentUser = localStorage.getItem('username') || 'Nguyen Tan';

    const PAGE_SIZE = 10;

    useEffect(() => {
        dispatch(resetComments());
        dispatch(getComments({ reelId: reel.id, page: 0, size: PAGE_SIZE }));
    }, [dispatch, reel.id]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    dispatch(getComments({ reelId: reel.id, page: currentPage + 1, size: PAGE_SIZE }));
                }
            },
            { threshold: 0.1 }
        );

        const target = commentRef.current.lastElementChild;
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, [currentPage, hasMore, isLoading, dispatch, reel.id]);

    const sendComment = (content) => {
        if (!content.trim()) return;
        dispatch(createComment({ reelId: reel.id, content }));
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment({ reelId: reel.id, commentId }));
    };

    const isCommentOwner = (comment) => comment.user.username === currentUser;

    const handleLikeComment = (commentId, isLiked) => {
        if (!isLiked) {
            dispatch(likeComment({ reelId: reel.id, commentId }));
        } else {
            dispatch(unlikeComment({ reelId: reel.id, commentId }));
        }
    };

    return (
        <ReelCommentContainer>
            <div className="comment-container">
                <HeaderBox title={`Comments (${comments.length})`} />
                <div className="line"></div>
                <div className="comment-list-container" ref={commentRef}>
                    {error && <div className="error-message">Error: {error.message}</div>}
                    {isLoading && comments.length === 0 && <div>Loading comments...</div>}
                    {comments.map((comment) => (
                        <div className="comment-item" key={comment.id} ref={(el) => (itemRefs.current[comment.id] = el)}>
                            <Thumbnail
                                className="thumbnail"
                                src={comment.user.avatar}
                                onclick={() => navigate(`/profile/${comment.user.username}`)}
                            />
                            <div className="comment-info">
                                <div className="username" onClick={() => navigate(`/profile/${comment.user.username}`)}>
                                    {comment.user.username}
                                </div>
                                <div className="content">{comment.content}</div>
                                <div className="sub-info">
                                    <div className="timestamp">{convertTimeToTimeAgo(comment.createdAt)}</div>
                                    <div
                                        className="like-count"
                                        onClick={() => handleLikeComment(comment.id, comment.isLiked || false)}
                                    >
                                        {comment.isLiked ? (
                                            <Icons.HeartFill className="like-icon" />) : (
                                            <Icons.HeartEmpty className="like-icon" />
                                            )}
                                        <div>{comment.likesCount}</div>
                                    </div>
                                    {isCommentOwner(comment) && (
                                        <div className="menu-dots" onClick={(e) => e.stopPropagation()}>
                                            <Icons.More className="more-icon" />
                                            <div className="dropdown-menu">
                                                <button onClick={() => handleDeleteComment(comment.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && comments.length > 0 && <div>Loading more comments...</div>}
                    {!hasMore && comments.length > 0 && <div>No more comments.</div>}
                </div>
                <SendComment ph="Send comment ..." onSendComment={sendComment} />
            </div>
        </ReelCommentContainer>
    );
};

export default ReelComment;
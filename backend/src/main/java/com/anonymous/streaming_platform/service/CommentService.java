package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.constant.NotiType;
import com.anonymous.streaming_platform.dto.event.NotificationEvent;
import com.anonymous.streaming_platform.dto.request.CommentCreationRequest;
import com.anonymous.streaming_platform.dto.response.CommentBasicResponse;
import com.anonymous.streaming_platform.dto.response.CommentCreationResponse;
import com.anonymous.streaming_platform.dto.response.ListCommentBasicResponse;
import com.anonymous.streaming_platform.entity.mongodb.Comment;
import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import com.anonymous.streaming_platform.entity.mysql.Reel;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.CommentMapper;
import com.anonymous.streaming_platform.mapper.ReelMapper;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mongodb.CommentRepository;
import com.anonymous.streaming_platform.repository.mysql.ReelRepository;
import com.anonymous.streaming_platform.service.kafkaMessenger.KafkaTopic;
import com.anonymous.streaming_platform.service.kafkaMessenger.MessageProducer;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final AuthContextProvider authContext;
    private final ReelRepository reelRepository;
    private final CommentMapper commentMapper;
    private final MessageProducer messageProducer;
    private final UserMapper userMapper;
    private final ReelMapper reelMapper;

    @Transactional
    public CommentCreationResponse createComment(CommentCreationRequest request, String reelId) {

        var user = authContext.getUser()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Reel reel = reelRepository.findVisibleReelById(user.getId(), reelId)
                .orElseThrow(() -> new AuthenticationException(Error.REEL_NOT_FOUND, reelId));

        // Kiểm tra reel có cho phép comment không
        if (reel.getCommentEnabled() == Boolean.FALSE) {
            throw new BusinessLogicException(Error.COMMENT_NOT_ALLOWED);
        }

        // Tạo comment mới
        Comment comment = Comment.builder()
                .content(request.content())
                .user(RelatedUser.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .avatar(user.getAvatar())
                        .build())
                .createdAt(LocalDateTime.now())
                .likesCount(0)
                .reelId(reelId)
                .build();

        Comment savedComment = commentRepository.save(comment);
        log.info("Created comment {} for reel {}.", savedComment.getId(), reelId);

        // Tăng số lượng Comment count trong reel
        reel.setCommentsCount(reel.getCommentsCount() + 1);
        reelRepository.save(reel);

        // Bắn Kafka message để gửi thông báo
        messageProducer.sendMessage(KafkaTopic.NOTIFICATION_TOPIC, NotificationEvent.builder()
                .receiverId(reel.getUser().getId())
                .reel(reelMapper.mapToRelatedReel(reel))
                .user(userMapper.mapToRelatedUser(user))
                .type(NotiType.COMMENT)
                .build());

        return commentMapper.mapToCommentCreationResponse(savedComment);
    }

    public ListCommentBasicResponse retrieveComments(String reelId, Pageable pageable) {

        // Lấy thông tin của reel
        Reel reel = reelRepository.findVisibleReelById(authContext.getUserId().orElse(null), reelId)
                .orElseThrow(() -> new EntityNotFoundException(Error.REEL_NOT_FOUND, reelId));

        // Lấy danh sách comment trong reel kèm isLiked bởi người dùng hiện tại
        Page<Comment> comments = commentRepository
                .findPopularComments(reelId, pageable);

        List<CommentBasicResponse> commentResponses = comments.stream()
                .map((comment) -> {
                    var isLiked = authContext.getUserId().isPresent()
                            ? comment.getLikedUserIds().contains(authContext.getUserId().get())
                            : false;

                    return commentMapper.mapToCommentBasicResponse(comment, isLiked);
                }).toList();

        log.info("Retrieved {} comments for reel {}.", comments.getTotalElements(), reelId);

        return ListCommentBasicResponse.builder()
                .comments(commentResponses)
                .currentPage(comments.getNumber())
                .totalPages(comments.getTotalPages())
                .build();
    }

    public void deleteComment(String reelId, String commentId) {

        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        // Kiểm tra reel có tồn tại không
        Reel reel = reelRepository.findVisibleReelById(currentUserId, reelId)
                .orElseThrow(() -> new EntityNotFoundException(Error.REEL_NOT_FOUND, reelId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException(Error.COMMENT_NOT_FOUND, commentId));

        // Kiểm tra vai trò của người comment (chủ reel, người comment)
        if (currentUserId.equals(reel.getUser().getId()) || currentUserId.equals(comment.getUser().getId())) {

            commentRepository.deleteById(commentId);

            // Cập nhật comment count trong reel
            reel.setCommentsCount(reel.getCommentsCount() - 1);
            reelRepository.save(reel);

            log.info("Deleted comment {} for reel {}.", commentId, reelId);
        } else {
            throw new AuthenticationException(Error.USER_NOT_PERMISSION);
        }
    }

    @Transactional
    public void likeComment(String commentId) {

        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException(Error.COMMENT_NOT_FOUND, commentId));

        // Thêm userId vào danh sách like của comment
        if(comment.getLikedUserIds() == null) {
            comment.setLikedUserIds(List.of(currentUserId));
        } else {
            comment.getLikedUserIds().add(currentUserId);
        }
        comment.setLikesCount(comment.getLikesCount() + 1);
        commentRepository.save(comment);

        log.info("Liked comment {}.", commentId);

        // Bắn Kafka message để gửi thông báo
        messageProducer.sendMessage(KafkaTopic.NOTIFICATION_TOPIC, NotificationEvent.builder()
                .receiverId(comment.getUser().getId())
                .reel(RelatedReel.builder().id(comment.getReelId()).build())
                .user(RelatedUser.builder().id(currentUserId).build())
                .type(NotiType.LIKE_COMMENT)
                .build());
    }

    @Transactional
    public void unlikeComment(String commentId) {

        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException(Error.COMMENT_NOT_FOUND, commentId));

        // Gỡ userId vào danh sách like của comment
        comment.getLikedUserIds().remove(currentUserId);
        comment.setLikesCount(Math.max(0, comment.getLikesCount() - 1));
        commentRepository.save(comment);

        log.info("Unlike comment {}.", commentId);
    }



}



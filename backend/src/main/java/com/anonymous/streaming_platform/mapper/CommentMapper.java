package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.request.CommentCreationRequest;
import com.anonymous.streaming_platform.dto.response.CommentBasicResponse;
import com.anonymous.streaming_platform.dto.response.CommentCreationResponse;
import com.anonymous.streaming_platform.entity.mongodb.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    CommentCreationResponse mapToCommentCreationResponse(Comment comment);

    Comment mapToCommentEntity(CommentCreationRequest request);

    CommentBasicResponse mapToCommentBasicResponse(Comment comment, Boolean isLiked);

}

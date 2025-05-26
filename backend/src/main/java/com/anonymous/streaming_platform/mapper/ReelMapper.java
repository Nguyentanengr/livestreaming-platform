package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.request.ReelCreationRequest;
import com.anonymous.streaming_platform.dto.response.ReelCreationResponse;
import com.anonymous.streaming_platform.dto.response.ReelRcmResponse;
import com.anonymous.streaming_platform.entity.mongodb.RelatedReel;
import com.anonymous.streaming_platform.entity.mysql.Reel;
import com.anonymous.streaming_platform.entity.mysql.User;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReelMapper {

    UserMapper userMapper = new UserMapperImpl();

    Reel mapToReelEntity(ReelCreationRequest request);

    ReelCreationResponse mapToReelCreationResponse(Reel reel, Long userId, List<String> tagNames);

    @Mapping(target = "user", expression = "java(userMapper.mapToUserThumbnailResponse(reel.getUser(), isFollowing))")
    ReelRcmResponse mapToReelRcmResponse(Reel reel, Boolean isLiked
            , List<String> tagNames, Boolean isFollowing);


    RelatedReel mapToRelatedReel(Reel reel);

}

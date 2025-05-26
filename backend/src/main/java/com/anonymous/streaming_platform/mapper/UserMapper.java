package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.request.UserRegistrationRequest;
import com.anonymous.streaming_platform.dto.response.*;
import com.anonymous.streaming_platform.entity.mongodb.RelatedUser;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.dto.response.UserStreamResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User mapToUserEntity(UserRegistrationRequest request);

    UserSummaryResponse mapToUserSummaryResponse(User user);

    UserProfileResponse mapToUserProfileResponse(User user);

    UserThumbnailResponse mapToUserThumbnailResponse(User user, Boolean isFollowing);

    UserProfileResponse mapToUserProfileResponse(User user, Boolean isFollowing);

    UserStreamResponse mapToUserStreamResponse(User user, Boolean isFollowing);

    FollowedUserResponse mapToFollowedUserResponse(User user, Boolean isFollowing);

    RcmUserResponse mapToRcmUserResponse(User user, Boolean isFollowing);

    UserSummaryResponse mapToUserSummaryResponse(RelatedUser relatedUser);

    RelatedUser mapToRelatedUser(User user);

}

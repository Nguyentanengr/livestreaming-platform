package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.request.ChatCreationRequest;
import com.anonymous.streaming_platform.dto.response.ChatCreationResponse;
import com.anonymous.streaming_platform.entity.mongodb.Chat;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatMapper {

    Chat mapToChatEntity(ChatCreationRequest request);

    ChatCreationResponse mapToChatCreationResponse(Chat chat);
}

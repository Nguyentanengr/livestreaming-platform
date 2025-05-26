package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.request.StreamCreationRequest;
import com.anonymous.streaming_platform.dto.response.StreamOsdResponse;
import com.anonymous.streaming_platform.dto.response.StreamRcmResponse;
import com.anonymous.streaming_platform.dto.response.StreamResponse;
import com.anonymous.streaming_platform.entity.mysql.Stream;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StreamMapper {

    UserMapper userMapper = new UserMapperImpl();

    StreamResponse mapToStreamResponse(Stream stream, List<String> tagNames);

    @Mapping(target = "user", expression = "java(userMapper.mapToUserStreamResponse(stream.getUser(), isFollowing))")
    StreamOsdResponse mapToStreamOsdResponse(Stream stream, List<String> tagNames, Boolean isFollowing);

    @Mapping(target = "user", expression = "java(userMapper.mapToUserStreamResponse(stream.getUser(), isFollowing))")
    StreamRcmResponse mapToStreamRcmResponse(Stream stream, List<String> tagNames, Boolean isFollowing);

    @Mapping(target = "thumbnail", ignore = true)
    Stream mapToStreamEntity(StreamCreationRequest request);
}

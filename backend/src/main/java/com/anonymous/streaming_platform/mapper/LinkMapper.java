package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.response.LinkResponse;
import com.anonymous.streaming_platform.entity.mysql.Link;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LinkMapper {
    LinkResponse mapToLinkResponse(Link link);

}

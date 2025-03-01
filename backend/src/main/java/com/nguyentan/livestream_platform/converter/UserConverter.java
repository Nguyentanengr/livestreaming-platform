package com.nguyentan.livestream_platform.converter;

import com.nguyentan.livestream_platform.dto.request.UserRegistrationRequest;
import com.nguyentan.livestream_platform.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserConverter {

    @Mapping(target = "password", ignore = true)
    User mapToUserEntity(UserRegistrationRequest request);



}

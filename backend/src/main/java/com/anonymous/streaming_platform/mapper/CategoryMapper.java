package com.anonymous.streaming_platform.mapper;

import com.anonymous.streaming_platform.dto.response.CategoryRcmResponse;
import com.anonymous.streaming_platform.dto.response.CategoryResponse;
import com.anonymous.streaming_platform.entity.mysql.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryResponse maptoCategoryResponse(Category category);

    CategoryResponse maptoCategoryResponse(Category category, Boolean isInterested);

    CategoryRcmResponse maptoCategoryRcmResponse(Category category, Boolean isInterested);
}

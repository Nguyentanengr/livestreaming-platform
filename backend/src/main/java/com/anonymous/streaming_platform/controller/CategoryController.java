package com.anonymous.streaming_platform.controller;


import com.anonymous.streaming_platform.dto.response.CategoryResponse;
import com.anonymous.streaming_platform.dto.response.ListCategoryRcmResponse;
import com.anonymous.streaming_platform.dto.response.ListCategoryResponse;
import com.anonymous.streaming_platform.dto.response.wrapper.ApiResponse;
import com.anonymous.streaming_platform.service.CategoryService;
import com.anonymous.streaming_platform.service.UserCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping(CategoryController.CATEGORY_URL)
@RequiredArgsConstructor
public class CategoryController {

    public static final String CATEGORY_URL = "api/v1/categories";

    private final CategoryService categoryService;
    private final UserCategoryService userCategoryService;

    @GetMapping
    public ApiResponse<ListCategoryResponse> retrieveCategories(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam(value = "fieldSorted", required = false, defaultValue = "name") String fieldSorted,
            @RequestParam(value = "asc", required = false, defaultValue = "true") boolean asc
    ) {

        log.info("Received request to retrieve categories " +
                "with key {} and page {} and size {}.", key, page, size);

        Map<String, String> fieldMap = Map.of(
                "id", "id",
                "name", "name",
                "description", "description",
                "count", "interestedCount"
        );

        String field = fieldMap.getOrDefault(fieldSorted, "name");

        PageRequest pageRequest = PageRequest.of(page, size, asc
                ? Sort.by(field).ascending()
                : Sort.by(field).descending());

        log.info("All request parameters: key {}, page {}, size {}, fieldSorted {}, asc {}", key, page, size, fieldSorted, asc);
        var response = categoryService.retrieveCategories(key, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/recommended")
    public ApiResponse<ListCategoryRcmResponse> retrieveRecommendedCategories(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {

        log.info("Received request to retrieve recommended categories " +
                "with key {} and page {} and size {}.", key, page, size);
        PageRequest pageRequest = PageRequest.of(page, size);
        var response = categoryService.retrieveRecommendedCategories(key, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

    @GetMapping("/interested")
    public ApiResponse<ListCategoryResponse> retrieveInterestedCategories(
            @RequestParam(value = "key", defaultValue = "") String key,
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ) {

        log.info("Received request to retrieve interested categories " +
                "with key {} and page {} and size {}.", key, page, size);
        PageRequest pageRequest = PageRequest.of(page, size);
        var response = categoryService.retrieveInterestedCategories(key, pageRequest);

        return ApiResponse.getSuccessResponse(response);
    }

        @PostMapping("/{id}/interested")
        public ApiResponse<Void> createUserCategory(
                @PathVariable("id") Long categoryId
        ) {
            log.info("Received request to create user category with category id {}.", categoryId);
            userCategoryService.createUserCategory(categoryId);
            return ApiResponse.getSuccessResponse(null);
        }

    @DeleteMapping("/{id}/interested")
    public ApiResponse<Void> deleteUserCategory(
            @PathVariable("id") Long categoryId
    ) {
        log.info("Received request to delete user category with category id {}.", categoryId);
        userCategoryService.deleteUserCategory(categoryId);
        return ApiResponse.getSuccessResponse(null);
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryResponse> retrieveCategory(
            @PathVariable("id") Long categoryId
    ) {
        log.info("Received request to retrieve category with category id {}.", categoryId);
        var response = categoryService.retrieveCategory(categoryId);
        return ApiResponse.getSuccessResponse(response);
    }

}

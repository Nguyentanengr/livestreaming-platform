package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.dto.response.CategoryRcmResponse;
import com.anonymous.streaming_platform.dto.response.CategoryResponse;
import com.anonymous.streaming_platform.dto.response.ListCategoryRcmResponse;
import com.anonymous.streaming_platform.dto.response.ListCategoryResponse;
import com.anonymous.streaming_platform.entity.mysql.Category;
import com.anonymous.streaming_platform.entity.mysql.UserCategoryId;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.CategoryMapper;
import com.anonymous.streaming_platform.repository.mysql.CategoryRepository;
import com.anonymous.streaming_platform.repository.mysql.UserCategoryRepository;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final AuthContextProvider authContext;
    private final CategoryMapper categoryMapper;
    private final CacheService cacheService;

    private static final String CATEGORY_PREFIX = "category:recommend:";
    private static final long CATEGORY_TTL = 10; // 10 minutes

    public ListCategoryResponse retrieveCategories(String key, Pageable pageable) {

        // Lấy ra tất cả categories theo page
        Page<Category> categories = categoryRepository.findAllWithKey(key, pageable);
        log.info("Retrieved categories {} with key {}.", categories, key);
        List<Long> categoryIds = categories.stream().map(Category::getId).toList();

        // Convert category sang response
        List<CategoryResponse> cr = categories.stream()
                .map(categoryMapper::maptoCategoryResponse)
                .toList();

        log.info("Response categories with current page {} and total pages {}"
                , categories.getNumber(), categories.getTotalPages() );

        return ListCategoryResponse.builder()
                .categories(cr)
                .currentPage(categories.getNumber())
                .totalPages(categories.getTotalPages())
                .build();
    }

    public ListCategoryRcmResponse retrieveRecommendedCategories(String key, Pageable pageable) {

        // Key: category:recommend:sport:0:10
        String cacheKey = CATEGORY_PREFIX + key + ":" + pageable.getPageNumber() + ":" + pageable.getPageSize();
        Optional<ListCategoryRcmResponse> cachedResponse = cacheService.get(cacheKey, ListCategoryRcmResponse.class);
        if (cachedResponse.isPresent()) {
            log.info("Retrieved recommended categories from cache.");
            return cachedResponse.get();
        }

        // Lấy ra các categories nổi bật trong tháng hiện tại
        LocalDate currentDate = LocalDate.now();
        LocalDateTime startOfMonth = currentDate.withDayOfMonth(1).atStartOfDay();
        LocalDateTime startOfNextMonth = currentDate.plusMonths(1).withDayOfMonth(1).atStartOfDay();

        Page<Category> categories = categoryRepository
                .findRcmCategories(key, startOfMonth, startOfNextMonth, pageable);

        log.info("Retrieved recommended categories {} with key {}.", categories, key);
        List<Long> categoryIds = categories.stream().map(Category::getId).toList();

        // Với mỗi category -> tìm isInterested theo user hiện tại
        Optional<Long> currentUserId = authContext.getUserId();

        // Lấy danh sách Id từ danh sách categories ở trên và lọc ra nếu được interested
        // Người dùng chưa đăng nhập -> rỗng
        var interestedCategoryIds = currentUserId.isPresent()
                ? userCategoryRepository.findInterestedInListByUserId(currentUserId.get(), categoryIds)
                : List.of();
        log.info("Retrieved interested category ids {} from {}"
                , interestedCategoryIds, categoryIds);

        // Convert category sang response
        List<CategoryRcmResponse> cr = categories.stream()
                .map(category -> categoryMapper.maptoCategoryRcmResponse(category,
                        interestedCategoryIds.contains(category.getId())))
                .toList();

        log.info("Response recommended categories with current page {} and total pages {}"
                , categories.getNumber(), categories.getTotalPages() );

        var response = ListCategoryRcmResponse.builder()
                .categories(cr)
                .currentPage(categories.getNumber())
                .totalPages(categories.getTotalPages())
                .build();

        log.info("Cached recommended categories to redis with key {}", cacheKey);
        cacheService.set(cacheKey, response, CATEGORY_TTL, TimeUnit.MINUTES);

        return response;
    }

    public ListCategoryResponse retrieveInterestedCategories(String key, Pageable pageable) {

        // Lấy thông tin user hiện tại
        Optional<Long> currentUserId = authContext.getUserId();

        // Nếu user là khách -> không cần xuất hiện mục này
        if (currentUserId.isEmpty()) {
            log.info("User is not logged in.");
            throw new AuthenticationException(Error.USER_NOT_PERMISSION);
        }

        log.info("Current userId {}", currentUserId.get());

        Page<Category> categories = categoryRepository
                .findInterestedCategoriesByUserId(key, currentUserId.get(), pageable);

        log.info("Retrieved interested categories {} with key {}.", categories.stream().toList(), key);

        var responses = categories.stream()
                .map((category -> categoryMapper.maptoCategoryResponse(category, Boolean.TRUE)))
                .toList();

        return ListCategoryResponse.builder()
                .categories(responses)
                .currentPage(categories.getNumber())
                .totalPages(categories.getTotalPages())
                .build();


    }


    public CategoryResponse retrieveCategory(Long categoryId) {

        var category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new AuthenticationException(Error.CATEGORY_NOT_FOUND, categoryId));
        var currentUserId = authContext.getUserId();

        boolean isInterested = userCategoryRepository.existsById(UserCategoryId.builder()
                        .categoryId(category.getId())
                        .userId(currentUserId.orElse(null))
                .build());

        log.info("Retrieved category {} with isInterested {}.", category, isInterested);

        return categoryMapper.maptoCategoryResponse(category, isInterested);
    }


}

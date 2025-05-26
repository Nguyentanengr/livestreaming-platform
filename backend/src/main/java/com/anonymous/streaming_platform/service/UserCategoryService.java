package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.entity.mysql.Category;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.entity.mysql.UserCategory;
import com.anonymous.streaming_platform.entity.mysql.UserCategoryId;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.repository.mysql.CategoryRepository;
import com.anonymous.streaming_platform.repository.mysql.UserCategoryRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserCategoryService {

    private final AuthContextProvider authContext;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;

    @Transactional
    public void createUserCategory(Long categoryId) {

        // Lấy thông tin người dùng hiện tại
        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        User user = userRepository.getReferenceById(currentUserId);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException(Error.CATEGORY_NOT_FOUND, categoryId));

        UserCategory userCategory = UserCategory.builder()
                .id(UserCategoryId.builder()
                        .categoryId(category.getId())
                        .userId(user.getId())
                        .build())
                .category(category)
                .user(user)
                .interestedAt(LocalDateTime.now())
                .build();

        userCategoryRepository.save(userCategory);

        // Tăng interested_count trong categori
        category.setInterestedCount(category.getInterestedCount() + 1);
        categoryRepository.save(category);

        log.info("Created user category for category {} and user {}.", categoryId, currentUserId);
    }

    @Transactional
    @Modifying
    public void deleteUserCategory(Long categoryId) {

        // Lấy thông tin người dùng hiện tại
        Long currentUserId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException(Error.CATEGORY_NOT_FOUND, categoryId));

        UserCategoryId userCategoryId = UserCategoryId.builder()
                .categoryId(categoryId)
                .userId(currentUserId)
                .build();

        // Giảm interested_count trong categori
        category.setInterestedCount(Math.max(0, category.getInterestedCount() - 1));
        categoryRepository.save(category);

        userCategoryRepository.deleteById(userCategoryId);
        log.info("Deleted user category for category {} and user {}.", categoryId, currentUserId);
    }
}

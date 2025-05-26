package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.dto.request.NotificationCreateRequest;
import com.anonymous.streaming_platform.dto.request.NotificationReadRequest;
import com.anonymous.streaming_platform.dto.response.ListNotificationResponse;
import com.anonymous.streaming_platform.dto.response.NotificationCountResponse;
import com.anonymous.streaming_platform.dto.response.NotificationResponse;
import com.anonymous.streaming_platform.entity.mongodb.Notification;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.NotificationMapper;
import com.anonymous.streaming_platform.repository.mongodb.NotificationRepository;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final AuthContextProvider authContext;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public ListNotificationResponse retrieveNotifications(Pageable pageable) {

        // Lấy userId của người đăng nhập hiện tại
        var userId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        // Lấy notification có người nhận là user hiện tại
        Page<Notification> notificationPages = notificationRepository
                .findAllByReceiverIdAndDeletedAtIsNullOrderByCreatedAtDesc(userId, pageable);

        List<NotificationResponse> responses = notificationPages.stream()
                .map(notificationMapper::mapToNotificationResponse).toList();

        log.info("Retrieved {} notifications.", responses.size());

        return ListNotificationResponse.builder()
                .notifications(responses)
                .totalPages(notificationPages.getTotalPages())
                .currentPage(notificationPages.getNumber())
                .build();
    }

    @Transactional
    public void markAsRead(NotificationReadRequest request) {

        var userId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        // Kiểm tra xem tất cả notification có thuộc về userId hay không
        List<Notification> notifications = notificationRepository.findAllById(request.notificationIds());
        for (Notification notification : notifications) {
            if (!notification.getReceiverId().equals(userId)) {
                throw new AuthenticationException(Error.USER_NOT_PERMISSION);
            }
        }

        notificationRepository.markAllInList(request.notificationIds());
        log.info("Marked {} notifications as read.", request.notificationIds().size());
    }

    @Transactional
    public void markAllAsRead() {
        var userId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        notificationRepository.markAllByUserId(userId);
        log.info("Marked all notifications as read for user {}.", userId);
    }

    @Transactional
    public void delete(String id) {

        // Chỉ user là người nhận thông báo mới được xóa.

        var userId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Error.NOTIFICATION_NOT_FOUND, id));

        if (!notification.getReceiverId().equals(userId)) {
            throw new AuthenticationException(Error.USER_NOT_PERMISSION);
        }

        notification.setDeletedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        log.info("Deleted notification {}.", id);
    }

    public NotificationCountResponse retrieveUnreadCount() {
        // Lấy userId của người đăng nhập hiện tại
        var userId = authContext.getUserId()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Integer count = notificationRepository.countUnread(userId);

        log.info("Current unread notification is {}.", count);

        return NotificationCountResponse.builder().unreadCount(count).build();
    }

    public NotificationResponse createNotification(NotificationCreateRequest request) {

        // Tạo thông báo và lưu vào database
        Notification notification = Notification.builder()
                .type(request.type().toString())
                .content(buildNotificationContent(request))
                .reel(request.reel())
                .user(request.user())
                .isRead(false)
                .receiverId(request.receiverId())
                .createdAt(LocalDateTime.now())
                .build();

        var saved = notificationRepository.save(notification);

        return notificationMapper.mapToNotificationResponse(saved);
    }


    private String buildNotificationContent(NotificationCreateRequest request) {

        return switch(request.type()) {
            case FOLLOW -> {
                yield request.user().getUsername() + " followed you.";
            }
            case LIKE_REEL -> {
                yield request.user().getUsername() + " liked your reel: " + request.reel().getDescription();
            }
            case LIKE_COMMENT -> {
                yield request.user().getUsername() + " liked your comment in reel: " + request.reel().getDescription();
            }
            case COMMENT -> {
                yield request.user().getUsername() + " commented in reel: " + request.reel().getDescription();
            }
            default -> {
                yield "This is default notification content.";
            }
        };
    }


}

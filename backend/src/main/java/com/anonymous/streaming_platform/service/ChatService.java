package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.dto.request.ChatCreationRequest;
import com.anonymous.streaming_platform.dto.response.ChatCreationResponse;
import com.anonymous.streaming_platform.entity.mongodb.Chat;
import com.anonymous.streaming_platform.entity.mysql.User;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.ChatMapper;
import com.anonymous.streaming_platform.mapper.UserMapper;
import com.anonymous.streaming_platform.repository.mongodb.ChatRepository;
import com.anonymous.streaming_platform.repository.mysql.StreamRepository;
import com.anonymous.streaming_platform.repository.mysql.UserRepository;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    public static final String CHAT_PREFIX = "chat:";
    private static final long CHAT_TTL = 1;

    private final ChatRepository chatRepository;
    private final AuthContextProvider authContext;
    private final StreamRepository streamRepository;
    private final CacheService cacheService;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final UserMapper userMapper;



    @Transactional
    public void deleteChat(String chatId) {

        // Kiểm tra quyền hạn: người xóa phải là chủ kênh hoặc người tạo ra chat
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException(Error.CHAT_NOT_FOUND, chatId));

        Optional<Long> currentUserId = authContext.getUserId();
        Long chatUserId = chat.getUser().getId();

        // Truy vấn lấy thông tin chủ kênh
        Long streamerId = streamRepository.findStreamerIdByStreamId(chat.getStreamId());

        // Nếu người dùng không phải khách
        if (currentUserId.isPresent()) {
            Long userId = currentUserId.get();
            log.info("current user is owner of {}", userId.equals(chatUserId) ? "chat" : "stream");

            // Nếu người hiện tại có quyền xóa
            if (userId.equals(chatUserId) || userId.equals(streamerId)) {
                chatRepository.deleteById(chatId);
                log.info("Deleted chat {}.", chatId);
                return;
            }
        }
        throw new AuthenticationException(Error.USER_NOT_PERMISSION);
    }

    public ChatCreationResponse createChat(ChatCreationRequest request, Long userId) {

        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));

        Chat chat = chatMapper.mapToChatEntity(request);
        chat.setUser(userMapper.mapToRelatedUser(currentUser));
        chat.setCreatedAt(LocalDateTime.now());

        var saved = chatRepository.save(chat);
        return chatMapper.mapToChatCreationResponse(saved);
    }
}

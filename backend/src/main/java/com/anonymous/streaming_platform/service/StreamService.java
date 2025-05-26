package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.constant.RtcAction;
import com.anonymous.streaming_platform.context.StreamSession;
import com.anonymous.streaming_platform.context.StreamSessionManager;
import com.anonymous.streaming_platform.context.UserSession;
import com.anonymous.streaming_platform.dto.event.RtcTransportEvent;
import com.anonymous.streaming_platform.dto.request.StreamCreationRequest;
import com.anonymous.streaming_platform.dto.response.*;
import com.anonymous.streaming_platform.entity.mysql.*;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.StreamMapper;
import com.anonymous.streaming_platform.repository.mysql.*;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidateFoundEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StreamService {

    private final StreamRepository streamRepository;
    private final UserRepository userRepository;
    private final AuthContextProvider authContext;
    private final ConnectionRepository connectionRepository;
    private final StreamMapper streamMapper;
    private final CacheService cacheService;
    private final UserCategoryRepository userCategoryRepository;
    private final StreamSessionManager streamSessionManager;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final CodeGenerator codeGenerator;
    private final TagRepository tagRepository;
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    private final WsStreamService wsStreamService;

    public static final String LIVE_STREAM_PREFIX = "livestream:username:";
    private static final long LIVE_STREAM_TTL = 1; // 1 phut
    public static final String STREAM_PREFIX = "stream:streamId:";
    private static final long STREAM_TTL = 1; // 1 phut

    public StreamResponse retrieveLiveStream(String username) {

        // Kiểm tra cache
        String key = LIVE_STREAM_PREFIX + username;
        Optional<StreamResponse> cached = cacheService.get(key, StreamResponse.class);
        if (cached.isPresent()) {
            log.info("Retrieved live stream from cache {} .", cached.get());
            return cached.get();
        }

        // Kiểm tra user có tồn tại trên hệ thống / bị xóa
        User user = userRepository.findByUsernameAndNotDeleted(username)
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));

        // Lấy thông tin stream (đang live) của người user này
        List<Stream> liveStreams = streamRepository.findLiveStreamByUsernameAndNotDeleted(username);

        if (liveStreams.isEmpty()) {
            log.info("No live stream found for user {}.", username);
            throw new EntityNotFoundException(Error.LIVE_STREAM_NOT_FOUND, username);
        }

        Stream stream = liveStreams.get(0);
        log.info("Retrieved live streamId {} for user {}.", stream.getId(), username);

        // Kiểm tra quyền riêng tư
        boolean isVisible = checkStreamVisibility(stream, user);

        log.info("Stream {} is {} visible.", stream.getId(), isVisible ? "" : "not ");
        if (!isVisible) {
            throw new BusinessLogicException(Error.STREAM_NOT_VISIBLE);
        }

        // Cache dữ liệu
        StreamResponse streamResponse = streamMapper.mapToStreamResponse(stream
                , stream.getTags().stream().map(Tag::getName).toList());

        cacheService.set(key, streamResponse, LIVE_STREAM_TTL, TimeUnit.MINUTES);
        log.info("Cached live stream {}.", streamResponse);
        return streamResponse;
    }


    public ListStreamResponse retrieveFollowedStreams(
            String key, int status, Pageable pageable
    ) { // Lấy stream từ những người đã follow dựa vào trạng thái và key (status 1: isStreaming)

        // Nếu người đăng nhập hiện tại là khách -> Unauthorized
        User user = authContext.getUser()
                .orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));


        // Tất cả stream lấy về đều là visible
        Page<Stream> streamPages = streamRepository
                .findFollowedStreamsWithStatus(user.getId(), status, key, pageable);

        List<Stream> streams = streamPages.getContent();
        log.info("Retrieved {} streams with status {} and key {}.", streams.size(), status, key);

        List<StreamResponse> responses = streams.stream()
                .map((stream) -> {
                    List<String> tagNames = stream.getTags().stream().map(Tag::getName).toList();
                    return streamMapper.mapToStreamResponse(stream, tagNames);
                })
                .toList();

        return ListStreamResponse.builder()
                .streams(responses)
                .currentPage(streamPages.getNumber())
                .totalPages(streamPages.getTotalPages())
                .build();
    }

    public ListStreamOsdResponse retrieveOutstandingStreams(Pageable pageable) {

        // Lấy thông tin user hiện tại (user hoặc khách)
        Optional<Long> currentUserId = authContext.getUserId();

        // Lấy categories mà user hiện tại đang thích
        List<UserCategory> userCategories = currentUserId.isEmpty() ? List.of()
                : userCategoryRepository.findByUserId(currentUserId.get());

        List<Long> interestedCatIds = userCategories.stream()
                .map((uc) -> uc.getId().getCategoryId())
                .toList();
        log.info("Retrieved interested categories for current user or guest: {}", interestedCatIds);

        // Lấy stream nổi bật phù hợp với user hiện tại
        Page<Stream> outstandingStreams = streamRepository
                .findOsdStreamAndNotDelete(currentUserId.orElse(null)
                        , interestedCatIds, pageable);

        // Lấy ra các streamer đã followed trong các stream trên
        List<Long> followingUserIds = connectionRepository.findFollowedWithListUserId(
                currentUserId.orElse(null),
                outstandingStreams.stream()
                        .map((stream) -> stream.getUser().getId())
                        .collect(Collectors.toSet())
        );
        log.info("Total of {} followed users in outstanding streams.", followingUserIds.size());

        List<StreamOsdResponse> responses = outstandingStreams.stream()
                .map((stream) -> {
                    var tagNames = stream.getTags().stream().map(Tag::getName).toList();
                    log.info("Stream tags: {}", tagNames);
                    var isFollowing = followingUserIds.contains(stream.getUser().getId());
                    return streamMapper.mapToStreamOsdResponse(stream, tagNames, isFollowing);
                }).toList();

        log.info("Retrieved {} outstanding streams.", responses.size());
        return ListStreamOsdResponse.builder()
                .streams(responses)
                .currentPage(outstandingStreams.getNumber())
                .totalPages(outstandingStreams.getTotalPages())
                .build();
    }


    public ListStreamRcmResponse retrieveRecommendedStreams(String key, int status, Pageable pageable) {

        // Lấy thông tin user hiện tại (user hoặc khách)
        Optional<Long> currentUserId = authContext.getUserId();

        // Lấy categories mà user hiện tại đang thích
        List<UserCategory> userCategories = currentUserId.isEmpty() ? List.of()
                : userCategoryRepository.findByUserId(currentUserId.get());

        List<Long> interestedCatIds = userCategories.stream()
                .map((uc) -> uc.getId().getCategoryId())
                .toList();
        log.info("Retrieved interested categories for current user or guest: {}", interestedCatIds);

        Page<Stream> streamPages = streamRepository
                .findRcmStreamAndNotDelete(currentUserId.orElse(null)
                        , interestedCatIds, key, status, pageable);
        log.info("Retrieved rcm streams: {}.", streamPages.getContent());

        List<Stream> streams = new ArrayList<>(streamPages.getContent());
        Collections.shuffle(streams);
        log.info("Shuffled items: {}.", streams);

        List<StreamRcmResponse> responses = streams.stream()
                .map((stream) -> {
                    var tagNames = stream.getTags().stream().map(Tag::getName).toList();
                    log.info("Stream tags : {}", tagNames);
                    return streamMapper.mapToStreamRcmResponse(stream, tagNames, null); // Dto không quan tâm isFollowing
                }).toList();

        log.info("Retrieved {} recommended streams.", responses.size());
        return ListStreamRcmResponse.builder()
                .streams(responses)
                .currentPage(streamPages.getNumber())
                .totalPages(streamPages.getTotalPages())
                .build();
    }

    public ListStreamRcmResponse retrieveMyStreams(String username, Pageable pageable) {

        // Xác định username
        User user = userRepository.findByUsernameAndNotDeleted(username)
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));

        // Lấy thông tin user hiện tại
        Optional<Long> currentUserId = authContext.getUserId();

        // Lấy ra các stream visible hoặc tất cả nếu currentUserId = username
        Page<Stream> streamPages = streamRepository.findAllMyStreamNotDeleted(currentUserId.orElse(null)
                , user.getId(), pageable);

        List<Stream> streams = streamPages.getContent();

        List<StreamRcmResponse> responses = streams.stream()
                .map((stream) -> {
                    var tagNames = stream.getTags().stream().map(Tag::getName).toList();
                    return streamMapper.mapToStreamRcmResponse(stream, tagNames, null); // Dto không quan tâm isFollowing
                }).toList();

        log.info("Retrieved {} my streams.", responses.size());
        return ListStreamRcmResponse.builder()
                .streams(responses)
                .currentPage(streamPages.getNumber())
                .totalPages(streamPages.getTotalPages())
                .build();
    }

    public StreamResponse retrieveStream(String streamId) {

        // Kiểm tra trong cache
        String streamCacheKey = STREAM_PREFIX + streamId;
        var streamResponseOptional = cacheService.get(streamCacheKey, StreamResponse.class);
        if (streamResponseOptional.isPresent()) {
            log.info("Retrieved stream from cache {}.", streamResponseOptional.get());
            return streamResponseOptional.get();
        }

        // Không có trong cache thì truy vấn db
        Optional<Long> currentUserId = authContext.getUserId();

        Stream stream = streamRepository.findByIdAndNotDeleted(streamId, currentUserId.orElse(null))
                .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, streamId));

        List<String> tagNames = stream.getTags().stream().map(Tag::getName).toList();
        var response =  streamMapper.mapToStreamResponse(stream, tagNames);

        // cache kết quả vào redis
        cacheService.set(streamCacheKey, response, STREAM_TTL, TimeUnit.MINUTES);
        log.info("Cached stream {}.", response);
        return response;
    }

    private boolean checkStreamVisibility(Stream stream, User owner) {
        // Kiểm tra quyền riêng tư (visible)

        boolean isVisible = switch (stream.getVisibility()) {
            case PUBLIC -> true;
            case PRIVATE -> {
                Optional<Long> currentUserId = authContext.getUserId();
                // Nếu người đăng nhập là chủ stream
                yield currentUserId.isPresent()
                        && currentUserId.get().equals(owner.getId());
            }
            case FOLLOWERS -> {
                Optional<Long> currentUserId = authContext.getUserId();
                // Followers chỉ cho phép người dùng đăng nhập và follow chủ kênh (username)
                if (currentUserId.isPresent()) {
                    yield connectionRepository.isConnectionExist(ConnectionId.builder()
                            .followerId(currentUserId.get())
                            .followingId(owner.getId())
                            .build());
                }
                yield false;
            }
            default -> false;
        };
        return isVisible;
    }


    public ListStreamRcmResponse retrieveStreamsByCategory(
            Long categoryId, String key, Pageable pageable
    ) {

        Optional<Long> currentUserId = authContext.getUserId();

        Page<Stream> streamPages = streamRepository.findByCategoryIdAndNotDeleted(categoryId, key
                        , currentUserId.orElse(null), pageable);

        List<Stream> streams = new ArrayList<>(streamPages.getContent());
        log.info("Retrieved {} streams by category {}.", streams.size(), categoryId);
        Collections.shuffle(streams);
        log.info("Shuffled items: {}.", streams);

        List<StreamRcmResponse> responses = streams.stream()
                .map((stream) -> {
                    var tagNames = stream.getTags().stream().map(Tag::getName).toList();
                    log.info("Stream tags : {}", tagNames);
                    return streamMapper.mapToStreamRcmResponse(stream, tagNames, null); // Dto không quan tâm isFollowing
                }).toList();

        log.info("Retrieved {} recommended streams.", responses.size());
        return ListStreamRcmResponse.builder()
                .streams(responses)
                .currentPage(streamPages.getNumber())
                .totalPages(streamPages.getTotalPages())
                .build();
    }


    public StreamCreationResponse createStream(StreamCreationRequest request, MultipartFile thumbnail) {

        // tạo stream session (tạo peer) với manager
        String streamId = wsStreamService.createStreamSession(request.userSessionId());

        // Lưu thông tin vào database.
        Long currentUserId = authContext.getUserId().orElseThrow(() -> new AuthenticationException(Error.USER_NOT_PERMISSION));
        User user = userRepository.getReferenceById(currentUserId);

        Set<Tag> tags = createTagsFromTagNames(request.tagNames());

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new EntityNotFoundException(Error.CATEGORY_NOT_FOUND, request.categoryId()));

        String thumbnailUrl = storageService.uploadFile(thumbnail, StorageService.THUMBNAIL_FILE_TYPE);

        Stream stream = streamMapper.mapToStreamEntity(request);
        stream.setId(streamId);
        stream.setPeakViewers(0);
        stream.setViewersCount(0);
        stream.setTotalViewers(0);
        stream.setStartedAt(LocalDateTime.now());
        stream.setUser(user);
        stream.setTags(tags);
        stream.setCategory(category);
        stream.setThumbnail(thumbnailUrl);

        streamRepository.save(stream);

        log.info("Created stream {} for user {}.", streamId, user.getId());

        // Gửi phản hồi thành công qua websocket
        wsStreamService.sendCreationResponse(streamId, request.userSessionId());

        return new StreamCreationResponse(streamId);
    }

    public void updateOffStream(String streamId) {

        Stream stream = streamRepository.findById(streamId)
                .orElseThrow(() -> new EntityNotFoundException(Error.STREAM_NOT_FOUND, streamId));

        stream.setEndedAt(LocalDateTime.now());
        streamRepository.save(stream);

        log.info("Updated stream {} to off.", streamId);
    }

    private Set<Tag> createTagsFromTagNames(List<String> tagNames) {

        log.info("All tag from request: {}", tagNames);
        Set<String> uniqueTagNames = tagNames.stream().filter(tagName -> !tagName.isEmpty())
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        // Lấy ra các tag đã tồn tại
        List<Tag> existingTags = tagRepository.findByNameIn(uniqueTagNames);
        log.info("All existing tags: {}", existingTags);

        List<String> existingTagNames = existingTags.stream()
                .map((tag) -> tag.getName().toLowerCase()).toList();

        // Tạo mới các tag nếu chưa tồn tại
        List<Tag> newTags = uniqueTagNames.stream()
                .filter((tagName) -> !existingTagNames.contains(tagName))
                .map((tagName) -> Tag.builder().name(tagName).build())
                .toList();
        log.info("All new tags: {}", newTags);

        // Tạo Set chứa tất cả các tag
        Set<Tag> tags = new HashSet<>();
        tags.addAll(existingTags);
        tags.addAll(newTags);

        log.info("All tags: {}", tags);

        var saved = tagRepository.saveAll(tags);
        log.info("Saved all tags to database {}", saved);

        return new HashSet<>(saved);
    }


}

package com.anonymous.streaming_platform.service;

import com.anonymous.streaming_platform.dto.request.ReelCreationRequest;
import com.anonymous.streaming_platform.dto.response.*;
import com.anonymous.streaming_platform.entity.mysql.*;
import com.anonymous.streaming_platform.exception.AuthenticationException;
import com.anonymous.streaming_platform.exception.EntityNotFoundException;
import com.anonymous.streaming_platform.exception.error.Error;
import com.anonymous.streaming_platform.mapper.ReelMapper;
import com.anonymous.streaming_platform.repository.mysql.*;
import com.anonymous.streaming_platform.util.AuthContextProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReelService {

    private final ReelRepository reelRepository;
    private final TagRepository tagRepository;
    private final AuthContextProvider authContext;
    private final StorageService storageService;
    private final ReelMapper reelMapper;
    private final CodeGenerator codeGenerator;
    private final ConnectionRepository connectionRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;


    @Transactional
    public ReelCreationResponse createReel(ReelCreationRequest request
            , MultipartFile video, MultipartFile thumbnail) {

        // Lấy thông tin người dùng hiện tại (người dùng được đăng nhập)
        User user = authContext.getUser()
                .orElseThrow(() -> new AuthenticationException(Error.UNAUTHORIZED));

        // Lấy hoặc tạo mới các Tag từ tagNames
        Set<Tag> tags = createTagsFromTagNames(request.tagNames());

        // Upload file lên S3
        String videoUrl = storageService.uploadFile(video, StorageService.REEL_FILE_TYPE);
        String thumbnailUrl = storageService.uploadFile(thumbnail, StorageService.THUMBNAIL_FILE_TYPE);

        // Tạo Reel mới
        Reel reel = Reel.builder()
                .id(codeGenerator.nextCode(CodeGenerator.CodeType.REEL_ID))
                .description(request.description())
                .video(videoUrl)
                .thumbnail(thumbnailUrl)
                .visibility(request.visibility())
                .commentEnabled(request.commentEnabled())
                .commentsCount(0)
                .likesCount(0)
                .viewsCount(0)
                .tags(tags)
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Lưu Reel
        Reel createdReel = reelRepository.save(reel);
        log.info("Created reel with id {} .", createdReel.getId());

        // Tăng reel count
        user.setReelsCount(user.getReelsCount() + 1);
        userRepository.save(user);

        return reelMapper.mapToReelCreationResponse(reel
                , user.getId(), tags.stream().map(Tag::getName).toList());
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


    public ListReelRcmResponse retrieveRecommendedReels(String key, Pageable pageable) {


        // Lấy thông tin người dùng hiện tại là khách hay user đã đăng nhập
        Optional<Long> currentUserId = authContext.getUserId();

        Page<Reel> reelPages = reelRepository.findRecommendedReelWithKeyAndVisibility(
                currentUserId.orElse(null), key, LocalDateTime.now().getYear(), pageable);

        log.info("Retrieved {} reels with key {}.", reelPages.getTotalElements(), key);


        // Tìm ra những người mà user hiện tại đã follow
        Set<Long> userIds = reelPages.stream()
                .map((reel) -> reel.getUser().getId())
                .collect(Collectors.toSet());

        log.info("Retrieved userIds from reels {}.", userIds);

        List<Long> followingIds = connectionRepository // Danh sách các followed user of reel
                .findFollowedWithListUserId(currentUserId.orElse(null), userIds);

        log.info("Current user has following {} users.", followingIds.size());

        // Tìm ra những reel mà user hiện tại đã like
        Set<String> reelIds = reelPages.stream()
                .map(Reel::getId)
                .collect(Collectors.toSet());

        List<String> likedReels = likeRepository
                .findLikedByUserIdFromReelIds(currentUserId.orElse(null), reelIds);

        // Map sang response
        List<ReelRcmResponse> responses = reelPages.stream()
                .map((reel) -> {
                    Boolean isLiked = likedReels.contains(reel.getId());
                    Boolean isFollowing = followingIds.stream()
                            .anyMatch((followingId) -> {
                                // Nếu người tạo reel nằm trong danh sách follow của user hiện tại
                                return reel.getUser().getId().equals(followingId);
                            });
                    List<String> tagNames = reel.getTags().stream()
                            .map(Tag::getName).toList();

                    var reelRcmResponse = reelMapper
                            .mapToReelRcmResponse(reel, isLiked, tagNames, isFollowing);

                    return reelRcmResponse;
                }).toList();

        log.info("List recommended responses {}", responses);

        // Xáo trộn danh sách
        var responsesCopy = new ArrayList<>(responses);
        Collections.shuffle(responsesCopy);

        return ListReelRcmResponse.builder()
                .reels(responsesCopy)
                .currentPage(reelPages.getNumber())
                .totalPages(reelPages.getTotalPages())
                .build();
    }


    public ListReelRcmResponse retrieveMyReels(String username, Pageable pageable) {

        // Xác định username
        User user = userRepository.findByUsernameAndNotDeleted(username)
                .orElseThrow(() -> new EntityNotFoundException(Error.USER_NOT_FOUND, username));

        // Lấy thông tin user hiện tại
        Optional<Long> currentUserId = authContext.getUserId();

        // Lấy ra các stream visible hoặc tất cả nếu currentUserId = username
        Page<Reel> reelPages = reelRepository.findAllMyStreamNotDeleted(currentUserId.orElse(null)
                , user.getId(), pageable);

        List<Reel> reels = reelPages.getContent();


        // Kiểm tra isFollowing giữa user hiện tại và user cần lấy thông tin
        boolean isFollowing = connectionRepository.isConnectionExist(ConnectionId.builder()
                .followingId(user.getId())
                .followerId(currentUserId.orElse(null))
                .build());

        // Lấy ra các reel được user hiện tại like từ reels ở trên
        List<String> likedReels = likeRepository
                .findLikedByUserIdFromReelIds(currentUserId.orElse(null)
                        , reelPages.stream().map(Reel::getId).toList());

        List<ReelRcmResponse> responses = reels.stream()
                .map((reel) -> {
                    var tagNames = reel.getTags().stream().map(Tag::getName).toList();
                    return reelMapper.mapToReelRcmResponse(reel, likedReels.contains(reel.getId()), tagNames, isFollowing); // Dto không quan tâm isFollowing
                }).toList();


        log.info("Retrieved {} my streams.", responses.size());
        return ListReelRcmResponse.builder()
                .reels(responses)
                .currentPage(reelPages.getNumber())
                .totalPages(reelPages.getTotalPages())
                .build();
    }


}

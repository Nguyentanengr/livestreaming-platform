package com.anonymous.streaming_platform.service;

import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String AVATAR_FILE_TYPE = "avatar";
    String THUMBNAIL_FILE_TYPE = "thumbnail";
    String REEL_FILE_TYPE = "reel";

    String uploadFile(MultipartFile file, String fileType);
}

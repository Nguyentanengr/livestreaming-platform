package com.anonymous.streaming_platform.service;


import com.anonymous.streaming_platform.exception.BusinessLogicException;
import com.anonymous.streaming_platform.exception.InternalServerException;
import com.anonymous.streaming_platform.exception.error.Error;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3StorageService implements StorageService {

    private final S3Client s3Client;
    private final CodeGenerator codeGenerator;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file, String fileType) {

        // Kiểm tra file format
        validateFile(file, fileType);

        String fileName = generateFileName(fileType, getFileExtension(file.getOriginalFilename()));

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));
            String fileUrl = s3Client.utilities()
                    .getUrl(builder -> builder.bucket(bucketName).key(fileName)).toExternalForm();

            log.info("Uploaded {} to S3 with url {}", fileType, fileUrl);
            return fileUrl;
        } catch (IOException e) {
            log.error("An error occurred while uploading file to S3: {}", e.getMessage(), e);
            throw new InternalServerException(Error.FILE_CANNOT_UPLOAD);
        }
    }

    private void validateFile(MultipartFile file, String fileType) {
        if (file == null || file.isEmpty()) {
            throw new BusinessLogicException(Error.MULTIPART_FILE_NOT_PROVIDED, fileType);
        }

        String contentType = file.getContentType();
        if ("avatar".equals(fileType) || "thumbnail".equals(fileType)) {
            if (!contentType.matches("image/(png|jpeg)")) {
                throw new BusinessLogicException(Error.IMAGE_FILE_TYPE_FORMAT_INVALID, fileType);
            }
        } else if ("video".equals(fileType)) {
            if (!contentType.matches("video/(mp4|mpeg)")) {
                throw new BusinessLogicException(Error.VIDEO_FILE_TYPE_FORMAT_INVALID, fileType);
            }
        }
    }

    private String generateFileName(String fileType, String fileExtension) {
        StringBuilder fileName = new StringBuilder();
        fileName.append(fileType)
                .append("_")
                .append(codeGenerator.nextCode(CodeGenerator.CodeType.FILE_NAME))
                .append(".")
                .append(fileExtension);
        return fileName.toString();
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "png"; // Mặc định cho avatar/thumbnail
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    }


}

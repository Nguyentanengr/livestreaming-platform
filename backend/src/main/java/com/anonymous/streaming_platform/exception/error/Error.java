package com.anonymous.streaming_platform.exception.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Error {

    USER_NOT_PERMISSION("USER_NOT_PERMISSION", "You are not authorized to perform this action."),
    UNCATEGORIZED_ERROR("UNCATEGORIZED_ERROR", "Uncategorized error"),
    MESSAGE_FORMAT_EXCEPTION("MESSAGE_FORMAT_EXCEPTION", "Error while formatting error message [%s]"),
    DESERIALIZATION_ERROR("DESERIALIZATION_ERROR", "Error while deserializing json from redis"),

    LOGIN_FAILED("LOGIN_FAILED", "Login failed"),
    UNAUTHORIZED("UNAUTHORIZED", "User is unauthorized"),

    JWT_TOKEN_CANNOT_GENERATE("JWT_TOKEN_CANNOT_GENERATE", "Cannot generate JWT token, please try again"),
    REFRESH_TOKEN_NOT_PROVIDED("REFRESH_TOKEN_NOT_PROVIDED", "Refresh token is not provided"),
    INVALID_REFRESH_TOKEN("INVALID_REFRESH_TOKEN", "Invalid refresh token with provided token %s"),
    JWT_TOKEN_CANNOT_PARSE("JWT_TOKEN_CANNOT_PARSE", "Cannot parse JWT token, please try again"),

    USER_NOT_FOUND("USER_NOT_FOUND", "No user found for the provided identity: %s"),

    ROLE_NOT_FOUND("ROLE_NOT_FOUND", "No role found for the provided name: %s"),

    OTP_TOKEN_CONFLICT("OTP_TOKEN_CONFLICT", "OTP token already exists for the email %s"),
    OTP_BLANK("OTP_BLANK", "OTP cannot be blank"),
    OTP_INVALID_SIZE("OTP_INVALID_SIZE", "OTP must be 6 digits"),
    OTP_MUST_BE_NUMERIC("OTP_MUST_BE_NUMERIC", "OTP must be numeric"),
    OTP_INCORRECT_OR_EXPIRED("OTP_INCORRECT_OR_EXPIRED", "OTP is incorrect or expired for the email %s"),

    USER_EMAIL_NOT_EXIST("USER_EMAIL_NOT_EXIST", "No user found for the provided email %s"),
    USER_EMAIL_EXISTS("USER_EMAIL_EXISTS", "Exist user with the same email %s"),
    EMAIL_BLANK("EMAIL_BLANK", "Email cannot be blank"),
    EMAIL_INVALID_SIZE("EMAIL_INVALID_SIZE", "Email cannot be too long or too short"),
    EMAIL_INVALID_FORMAT("EMAIL_INVALID_FORMAT", "Invalid email format"),
    EMAIl_CANNOT_SEND("EMAIl_CANNOT_SEND", "Cannot send email with provided email %s, please try again"),
    USER_HAS_BEEN_BLOCKED("USER_HAS_BEEN_BLOCKED", "User has been blocked"),

    PASSWORD_INVALID("PASSWORD_INVALID", "Invalid password"),
    PASSWORDS_NOT_MATCH("PASSWORDS_NOT_MATCH", "New password and confirmation password do not match"),
    PASSWORD_BLANK("PASSWORD_BLANK", "Password cannot be blank"),
    PASSWORD_INVALID_SIZE("PASSWORD_INVALID_SIZE", "Password must be 8 digits"),
    PASSWORD_IS_WEAK("PASSWORD_IS_WEAK", "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    PASSWORD_OLD_INVALID("PASSWORD_OLD_INVALID", "Old password is incorrect"),
    USERNAME_EXISTS("USERNAME_EXISTS", "Exist user with the same username %s"),
    USERNAME_BLANK("USERNAME_BLANK", "Username cannot be blank"),
    USERNAME_INVALID_SIZE("USERNAME_INVALID_SIZE", "Username must be 4 - 20 characters long"),

    AVATAR_BLANK("AVATAR_BLANK", "Avatar cannot be blank"),
    AVATAR_INVALID_SIZE("AVATAR_INVALID_SIZE", "Avatar cannot be too long"),

    LINK_BLANK("LINK_BLANK", "Link cannot be blank"),
    LINK_INVALID_SIZE("LINK_INVALID_SIZE", "Link cannot be too long"),

    BIO_INVALID_SIZE("BIO_INVALID_SIZE", "Bio cannot be too long"),

    MULTIPART_FILE_NOT_PROVIDED("MULTIPART_FILE_NOT_PROVIDED", "%s file is not provided"),
    IMAGE_FILE_TYPE_FORMAT_INVALID("IMAGE_FILE_TYPE_FORMAT_INVALID", "Invalid %s format, only PNG, JPEG are allowed"),
    VIDEO_FILE_TYPE_FORMAT_INVALID("VIDEO_FILE_TYPE_FORMAT_INVALID", "Invalid %s format, only MP4, MPEG are allowed"),
    FILE_CANNOT_UPLOAD("FILE_CANNOT_UPLOAD", "Cannot upload file, please try again"),

    VISIBILITY_BLANK("VISIBILITY_BLANK", "Visibility option cannot be blank"),
    COMMENT_ENABLED_BLANK("COMMENT_ENABLED_BLANK", "Comment enabled option cannot be blank"),

    LIVE_STREAM_NOT_FOUND("LIVE_STREAM_NOT_FOUND", "No live stream found for username: %s"),
    STREAM_NOT_VISIBLE("STREAM_NOT_VISIBLE", "Stream is not visible for you"),
    STREAM_NOT_FOUND("STREAM_NOT_FOUND", "No stream found for streamId: %s"),

    CHAT_NOT_FOUND("CHAT_NOT_FOUND", "No chat found for chatId: %s"),

    REEL_NOT_FOUND("REEL_NOT_FOUND", "No reel found for reelId: %s"),

    COMMENT_NOT_ALLOWED("COMMENT_NOT_ALLOWED", "You are not allowed to comment on this reel"),
    COMMENT_INVALID_SIZE("COMMENT_INVALID_SIZE", "Comment cannot be too long"),
    COMMENT_BLANK("COMMENT_BLANK", "Comment cannot be blank"),
    COMMENT_NOT_FOUND("COMMENT_NOT_FOUND", "No comment found for commentId: %s"),

    CATEGORY_NOT_FOUND("CATEGORY_NOT_FOUND", "No category found for categoryId: %s"),

    NOTIFICATION_NOT_FOUND("NOTIFICATION_NOT_FOUND", "No notification found for notificationId: %s"),

    LIKE_REEL_EXISTS("LIKE_REEL_EXISTS", "You have already liked this reel"),


    STREAM_TITLE_BLANK("STREAM_TITLE_BLANK", "Stream title cannot be blank"),
    CATEGORY_NOT_PROVIDED("CATEGORY_NOT_PROVIDED", "Category is not provided"),
    TAG_NAME_EMPTY("TAG_NAME_EMPTY", "Tag name must be at least one tag"),
    THUMBNAIL_NOT_PROVIDED("THUMBNAIL_NOT_PROVIDED", "Thumbnail is not provided"),
    COMMENT_ENABLE_BLANK("COMMENT_ENABLE_BLANK", "Comment enable option cannot be blank"),

    USER_SESSION_NOT_NULL("USER_SESSION_NOT_NULL", "User session must be null"),
    USER_SESSION_NOT_FOUND("USER_SESSION_NOT_FOUND", "No user session found for userSessionId: %s"),
    // Gửi OTP đăng ký tài khoản qua email
    // EMAIL_BLANK, EMAIL_INVALID_SIZE, EMAIL_INVALID_FORMAT, USER_EMAIL_EXISTS, OTP_TOKEN_CONFLICT,
    // EMAIl_CANNOT_SEND

    // Gửi OTP đặt lại mật khẩu
    // EMAIL_BLANK, EMAIL_INVALID_SIZE, EMAIL_INVALID_FORMAT, USER_EMAIL_NOT_EXIST, OTP_TOKEN_CONFLICT,
    // EMAIl_CANNOT_SEND

    // Đăng ký user
    // OTP_BLANK, OTP_INVALID_SIZE, OTP_MUST_BE_NUMERIC, EMAIL_BLANK, EMAIL_INVALID_SIZE
    // EMAIL_INVALID_FORMAT, PASSWORD_BLANK, PASSWORD_INVALID_SIZE, PASSWORD_IS_WEAK
    // OTP_INCORRECT_OR_EXPIRED, ROLE_NOT_FOUND, JWT_TOKEN_CANNOT_GENERATE

    // Đăng nhập user
    // EMAIL_BLANK, EMAIL_INVALID_SIZE, EMAIL_INVALID_FORMAT, PASSWORD_BLANK, PASSWORD_INVALID_SIZE,
    // PASSWORD_IS_WEAK, LOGIN_FAILED, USER_HAS_BEEN_BLOCKED, JWT_TOKEN_CANNOT_GENERATE

    // Refresh token
    // REFRESH_TOKEN_NOT_PROVIDED, INVALID_REFRESH_TOKEN, JWT_TOKEN_CANNOT_PARSE, JWT_TOKEN_CANNOT_GENERATE
    // USER_NOT_FOUND

    // Đặt lại mật khẩu
    // OTP_BLANK, OTP_INVALID_SIZE, OTP_MUST_BE_NUMERIC, EMAIL_BLANK, EMAIL_INVALID_SIZE, EMAIL_INVALID_FORMAT,
    // PASSWORD_BLANK, PASSWORD_INVALID_SIZE, PASSWORD_IS_WEAK, OTP_INCORRECT_OR_EXPIRED, JWT_TOKEN_CANNOT_GENERATE




    ;
    private final String code;
    private final String message;
}

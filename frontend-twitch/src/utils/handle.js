const getErrorObject = (code, message) => {
    return {
        code: code,
        message: message,
    };
};

export const handleErrorResponse = (error) => {
    const { code, message } = error;

    switch (code) {
        // General Errors
        case 'USER_NOT_PERMISSION':
            return getErrorObject(code, 'You do not have permission to perform this action.');
        case 'UNCATEGORIZED_ERROR':
            return getErrorObject(code, 'An unexpected error occurred. Please try again.');
        case 'MESSAGE_FORMAT_EXCEPTION':
            return getErrorObject(code, 'An error occurred while processing your request.');
        case 'DESERIALIZATION_ERROR':
            return getErrorObject(code, 'An error occurred while loading data.');

        // Authentication Errors
        case 'LOGIN_FAILED':
            return getErrorObject(code, 'Login failed. Please check your email and password.');
        case 'UNAUTHORIZED':
            return getErrorObject(code, 'You are not authorized. Please log in.');
        case 'USER_NOT_FOUND':
            return getErrorObject(code, 'No account found with this email.');
        case 'USER_HAS_BEEN_BLOCKED':
            return getErrorObject(code, 'Your account has been blocked. Please contact support.');

        // JWT and Token Errors
        case 'JWT_TOKEN_CANNOT_GENERATE':
            return getErrorObject(code, 'Unable to process your request. Please try again.');
        case 'REFRESH_TOKEN_NOT_PROVIDED':
            return getErrorObject(code, 'Session expired. Please log in again.');
        case 'INVALID_REFRESH_TOKEN':
            return getErrorObject(code, 'Invalid session. Please log in again.');
        case 'JWT_TOKEN_CANNOT_PARSE':
            return getErrorObject(code, 'Authentication error. Please log in again.');

        // Role Errors
        case 'ROLE_NOT_FOUND':
            return getErrorObject(code, 'An error occurred with account permissions. Please contact support.');

        // OTP Errors
        case 'OTP_TOKEN_CONFLICT':
            return getErrorObject(code, 'An OTP has already been sent. Please check your email or try again later.');
        case 'OTP_BLANK':
            return getErrorObject(code, 'Please enter the OTP.');
        case 'OTP_INVALID_SIZE':
            return getErrorObject(code, 'OTP must be 6 digits.');
        case 'OTP_MUST_BE_NUMERIC':
            return getErrorObject(code, 'OTP must contain only numbers.');
        case 'OTP_INCORRECT_OR_EXPIRED':
            return getErrorObject(code, 'The OTP is incorrect or has expired. Please request a new one.');

        // Email Errors
        case 'USER_EMAIL_NOT_EXIST':
            return getErrorObject(code, 'No account found with this email.');
        case 'USER_EMAIL_EXISTS':
            return getErrorObject(code, 'An account with this email already exists.');
        case 'EMAIL_BLANK':
            return getErrorObject(code, 'Please enter an email address.');
        case 'EMAIL_INVALID_SIZE':
            return getErrorObject(code, 'Email address is too long or too short.');
        case 'EMAIL_INVALID_FORMAT':
            return getErrorObject(code, 'Please enter a valid email address.');
        case 'EMAIl_CANNOT_SEND':
            return getErrorObject(code, 'Unable to send email. Please try again later.');

        // Password Errors
        case 'PASSWORD_INVALID':
            return getErrorObject(code, 'Incorrect password. Please try again.');
        case 'PASSWORDS_NOT_MATCH':
            return getErrorObject(code, 'Incorrect password. Please try again.');
        case 'PASSWORD_BLANK':
            return getErrorObject(code, 'Incorrect password. Please try again.');
        case 'PASSWORD_INVALID_SIZE':
            return getErrorObject(code, 'Incorrect password. Please try again.');
        case 'PASSWORD_IS_WEAK':
            return getErrorObject(code, 'Incorrect password. Please try again.');

        // Username Errors
        case 'USERNAME_EXISTS':
            return getErrorObject(code, 'This username is already taken.');
        case 'USERNAME_BLANK':
            return getErrorObject(code, 'Please enter a username.');
        case 'USERNAME_INVALID_SIZE':
            return getErrorObject(code, 'Username must be 4 to 20 characters long.');

        // Avatar Errors
        case 'AVATAR_BLANK':
            return getErrorObject(code, 'Please select an avatar.');
        case 'AVATAR_INVALID_SIZE':
            return getErrorObject(code, 'Avatar size is too large.');

        // Link Errors
        case 'LINK_BLANK':
            return getErrorObject(code, 'Please provide a link.');
        case 'LINK_INVALID_SIZE':
            return getErrorObject(code, 'Link is too long.');

        // Bio Errors
        case 'BIO_INVALID_SIZE':
            return getErrorObject(code, 'Bio is too long.');

        // File Upload Errors
        case 'MULTIPART_FILE_NOT_PROVIDED':
            return getErrorObject(code, 'Please upload a file.');
        case 'IMAGE_FILE_TYPE_FORMAT_INVALID':
            return getErrorObject(code, 'Only PNG or JPEG images are allowed.');
        case 'VIDEO_FILE_TYPE_FORMAT_INVALID':
            return getErrorObject(code, 'Only MP4 or MPEG videos are allowed.');
        case 'FILE_CANNOT_UPLOAD':
            return getErrorObject(code, 'Unable to upload file. Please try again.');

        // Visibility and Comment Settings
        case 'VISIBILITY_BLANK':
            return getErrorObject(code, 'Please select a visibility option.');
        case 'COMMENT_ENABLED_BLANK':
            return getErrorObject(code, 'Please specify if comments are enabled.');

        // Stream and Chat Errors
        case 'LIVE_STREAM_NOT_FOUND':
            return getErrorObject(code, 'No live stream found.');
        case 'STREAM_NOT_VISIBLE':
            return getErrorObject(code, 'This stream is not available to view.');
        case 'CHAT_NOT_FOUND':
            return getErrorObject(code, 'Chat not found.');

        // Reel Errors
        case 'REEL_NOT_FOUND':
            return getErrorObject(code, 'Reel not found.');

        // Comment Errors
        case 'COMMENT_NOT_ALLOWED':
            return getErrorObject(code, 'You are not allowed to comment on this reel.');
        case 'COMMENT_INVALID_SIZE':
            return getErrorObject(code, 'Comment is too long.');
        case 'COMMENT_BLANK':
            return getErrorObject(code, 'Please enter a comment.');
        case 'COMMENT_NOT_FOUND':
            return getErrorObject(code, 'Comment not found.');

        // Category Errors
        case 'CATEGORY_NOT_FOUND':
            return getErrorObject(code, 'Category not found.');

        default:
            return getErrorObject(code, message || 'An unexpected error occurred. Please try again.');
    }
};


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:8080/api/v1';

export const API_URLS = {

    // Authentication
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    OTP_REGISTER: `${API_BASE_URL}/auth/send-otp/register`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    OTP_RESET_PASSWORD: `${API_BASE_URL}/auth/send-otp/reset-password`,
    LOG_OUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    GET_MY_PROFILE: `${API_BASE_URL}/users/me/profile`,
    GET_PROFILE: `${API_BASE_URL}/users/{username}/profile`,
    GET_MY_STREAMS: `${API_BASE_URL}/users/{username}/streams?page={page}&size={size}`,
    GET_MY_REELS: `${API_BASE_URL}/users/{username}/reels?page={page}&size={size}`,
    UPDATE_MY_PROFILE: `${API_BASE_URL}/users/me/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/me/password`,
    CREATE_REEL: `${API_BASE_URL}/reels`,
    RECOMMENDED_REELS: `${API_BASE_URL}/reels/recommended?key={key}&page={page}&size={size}`,
    LIKE_REEL: `${API_BASE_URL}/reels/{reelId}/like`,
    UNLIKE_REEL: `${API_BASE_URL}/reels/{reelId}/unlike`,
    GET_COMMENT: `${API_BASE_URL}/reels/{reelId}/comments?page={page}&size={size}`,
    CREATE_COMMENT: `${API_BASE_URL}/reels/{reelId}/comments`,
    DELETE_COMMENT: `${API_BASE_URL}/reels/{reelId}/comments/{commentId}`,
    LIKE_COMMENT: `${API_BASE_URL}/reels/{reelId}/comments/{commentId}/like`,
    UNLIKE_COMMENT: `${API_BASE_URL}/reels/{reelId}/comments/{commentId}/unlike`,
    FOLLOW_USER: `${API_BASE_URL}/users/{username}/follow`,
    UNFOLLOW_USER: `${API_BASE_URL}/users/{username}/unfollow`,
    NOTIFICATIONS_UNREAD: `${API_BASE_URL}/notifications/unread`,
    NOTIFICATIONS: `${API_BASE_URL}/notifications?page={page}&size={size}`,
    NOTIFICATIONS_READ: `${API_BASE_URL}/notifications/read`,
    NOTIFICATIONS_READ_ALL: `${API_BASE_URL}/notifications/read/all`,
    NOTIFICATIONS_DELETE: `${API_BASE_URL}/notifications/{notificationId}`,
    STREAM_OUTSTANDING: `${API_BASE_URL}/streams/outstanding?size={size}&page={page}`,
    STREAM_RECOMMENDED: `${API_BASE_URL}/streams/recommended?status={status}&key={key}&page={page}&size={size}`,
    CATEGORIES_RECOMMENDED: `${API_BASE_URL}/categories/recommended?key={key}&page={page}&size={size}`,
    GET_STREAM: `${API_BASE_URL}/streams/{streamId}`,
    USER_PROFILE: `${API_BASE_URL}/users/{username}/profile`,
    CATEGORY_STREAMS: `${API_BASE_URL}/categories/{categoryId}/streams?key={key}&page={page}&size={size}`,
    INTERESTED_CATEGORY: `${API_BASE_URL}/categories/{categoryId}/interested`,
    GET_CATEGORY: `${API_BASE_URL}/categories/{categoryId}`,
    GET_ALL_CATEGORIES: `${API_BASE_URL}/categories?key={key}&page={page}&size={size}`,
    GET_INTERESTED_CATEGORIES: `${API_BASE_URL}/categories/interested?key={key}&page={page}&size={size}`,
    GET_FOLLOWED_USERS: `${API_BASE_URL}/users/followed?key={key}&page={page}0&size={size}`,
    GET_FOLLOWED_STREAMS: `${API_BASE_URL}/streams/followed?status={status}&key={key}&page={page}&size={size}`,
}




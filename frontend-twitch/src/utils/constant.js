

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
}




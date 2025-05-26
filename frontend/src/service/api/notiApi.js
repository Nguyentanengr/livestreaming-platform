import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleErrorResponse } from '../../utils/handle';
import { API_URLS } from '../../utils/constant';

// Lấy số lượng thông báo chưa đọc
export const fetchUnreadNotificationCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.NOTIFICATIONS_UNREAD, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);

// Lấy danh sách thông báo
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.NOTIFICATIONS.replace('{page}', page).replace('{size}', size);
            const response = await fetch(TARGET_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return apiResponse.data;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);

// Đánh dấu thông báo là đã đọc
export const markNotificationsAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationIds, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.NOTIFICATIONS_READ, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({ notificationIds }),
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return notificationIds;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);

// Đánh dấu tất cả thông báo là đã đọc
export const markAllNotificationsAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URLS.NOTIFICATIONS_READ_ALL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return true;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);

// Xóa thông báo
export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async ({ notificationId }, { rejectWithValue }) => {
        try {
            const TARGET_URL = API_URLS.NOTIFICATIONS_DELETE.replace('{notificationId}', notificationId);
            const response = await fetch(TARGET_URL, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                },
            });

            const apiResponse = await response.json();

            if (apiResponse.status !== 'success') {
                return rejectWithValue(handleErrorResponse(apiResponse.error));
            }

            return notificationId;
        } catch (error) {
            return rejectWithValue(
                handleErrorResponse({
                    code: 'NETWORK_ERROR',
                    message: 'Network error',
                })
            );
        }
    }
);
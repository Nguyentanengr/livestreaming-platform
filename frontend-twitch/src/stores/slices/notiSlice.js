import { createSlice } from '@reduxjs/toolkit';
import { deleteNotification, fetchNotifications, fetchUnreadNotificationCount, markAllNotificationsAsRead, markNotificationsAsRead } from '../../service/api/notiApi';


const initialState = {
    notifications: [],
    unreadCount: 0,
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: null,
};

const notiSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        resetNotifications: (state) => {
            state.notifications = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
        deleteNoti: (state, action) => {
            state.notifications = state.notifications.filter((noti) => noti.id !== action.payload);
        },
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Lấy số lượng thông báo chưa đọc
        builder
            .addCase(fetchUnreadNotificationCount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnreadNotificationCount.fulfilled, (state, action) => {
                state.loading = false;
                state.unreadCount = action.payload.unreadCount;
            })
            .addCase(fetchUnreadNotificationCount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Lấy danh sách thông báo
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = [...state.notifications, ...action.payload.notifications];
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Đánh dấu thông báo là đã đọc
        builder
            .addCase(markNotificationsAsRead.fulfilled, (state, action) => {
                const notificationIds = action.payload;
                state.notifications = state.notifications.map((notification) =>
                    notificationIds.includes(notification.id)
                        ? { ...notification, isRead: true }
                        : notification
                );
                state.unreadCount = Math.max(0, state.unreadCount - notificationIds.length);
            })
            .addCase(markNotificationsAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });

        // Đánh dấu tất cả thông báo là đã đọc
        builder
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map((notification) => ({
                    ...notification,
                    isRead: true,
                }));
                state.unreadCount = 0;
            })
            .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });

        // Xóa thông báo
        builder
            .addCase(deleteNotification.fulfilled, (state, action) => {
                const notificationId = action.payload;
                state.notifications = state.notifications.filter(
                    (notification) => notification.id !== notificationId
                );
                state.unreadCount = state.notifications.filter(
                    (notification) => !notification.isRead
                ).length;
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { resetNotifications, deleteNoti, setUnreadCount } = notiSlice.actions;
export default notiSlice.reducer;
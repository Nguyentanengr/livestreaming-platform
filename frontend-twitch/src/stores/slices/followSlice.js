import { createSlice } from "@reduxjs/toolkit";
import { followUserInFollowing, getFollowedRecentStreams, getFollowedStreams, getFollowedUsers, unfollowUserInFollowing } from "../../service/api/followApi";

export const followSlice = createSlice({
    name: "follow",
    initialState: {
        followedUsers: [],
        followedStreams: [],
        recentFollowedStreams: [],
        currentPage: 0,
        totalPages: 0,
        loading: false,
        error: null,
        streamLoading: false,
        streamError: null,
        streamCurrentPage: 0,
        streamTotalpage: 0,
        recentLoading: false,
        recentError: null,
    },
    reducers: {
        clearFollowedUsers: (state) => {
            state.followedUsers = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
        clearFollowedStreams: (state) => {
            state.followedStreams = [];
            state.streamCurrentPage = 0;
            state.streamTotalpage = 0;
        },
        clearRecentFollowedStreams: (state) => {
            state.recentFollowedStreams = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Followed Users
            .addCase(getFollowedUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFollowedUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.followedUsers = action.payload.users;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getFollowedUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(followUserInFollowing.pending, (state, action) => {
                const { username } = action.meta.arg;
                const user = state.followedUsers.find((u) => u.username === username);
                if (user) {
                    user.isFollowing = true;
                    user.followersCount += 1;
                }
            })
            .addCase(followUserInFollowing.rejected, (state) => {
                const { username } = action.meta.arg;
                const user = state.followedUsers.find((u) => u.username === username);
                if (user) {
                    user.isFollowing = false;
                    user.followersCount -= 1;
                }
            })
            .addCase(unfollowUserInFollowing.pending, (state, action) => {
                const { username } = action.meta.arg;
                const user = state.followedUsers.find((u) => u.username === username);
                if (user) {
                    user.isFollowing = false;
                    user.followersCount -= 1;
                }
            })
            .addCase(unfollowUserInFollowing.rejected, (state) => {
                const { username } = action.meta.arg;
                const user = state.followedUsers.find((u) => u.username === username);
                if (user) {
                    user.isFollowing = true;
                    user.followersCount += 1;
                }
            })

            // Get Followed Streams
            .addCase(getFollowedStreams.pending, (state) => {
                state.streamLoading = true;
                state.streamError = null;
            })
            .addCase(getFollowedStreams.fulfilled, (state, action) => {
                state.streamLoading = false;
                state.followedStreams = action.payload.streams;
                state.streamCurrentPage = action.payload.currentPage;
                state.streamTotalpage = action.payload.totalPages;
            })
            .addCase(getFollowedStreams.rejected, (state, action) => {
                state.streamLoading = false;
                state.streamError = action.payload;
            })
            .addCase(getFollowedRecentStreams.pending, (state) => {
                state.recentLoading = true;
                state.recentError = null;
            })
            .addCase(getFollowedRecentStreams.fulfilled, (state, action) => {
                state.recentLoading = false;
                state.recentFollowedStreams = action.payload.streams;
            })
            .addCase(getFollowedRecentStreams.rejected, (state, action) => {
                state.recentLoading = false;
                state.recentError = action.payload;
            });
    },
});

export const { clearFollowedUsers, clearFollowedStreams, clearRecentFollowedStreams } = followSlice.actions;

export default followSlice.reducer;
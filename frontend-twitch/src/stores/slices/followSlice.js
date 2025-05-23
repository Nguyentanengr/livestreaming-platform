import { createSlice } from "@reduxjs/toolkit";
import { followUserInFollowing, getFollowedUsers, unfollowUserInFollowing } from "../../service/api/followApi";

export const followSlice = createSlice({
    name: "follow",
    initialState: {
        followedUsers: [],
        currentPage: 0,
        totalPages: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearFollowedUsers: (state) => {
            state.followedUsers = [];
            state.currentPage = 0;
            state.totalPages = 0;
        },
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
            });
    },
});

export const { clearFollowedUsers } = followSlice.actions;

export default followSlice.reducer;
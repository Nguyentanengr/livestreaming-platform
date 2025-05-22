import { createSlice } from "@reduxjs/toolkit";
import { followUserInStream, getUserProfile, unfollowUserInStream } from "../../service/api/userApi";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProfile: (state) => {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(followUserInStream.pending, (state) => {
                if (state.profile) {
                    state.profile = { ...state.profile, isFollowing: true };
                }
            })
            .addCase(followUserInStream.fulfilled, (state) => {
                // Không cần cập nhật lại vì đã cập nhật trong pending
            })
            .addCase(followUserInStream.rejected, (state) => {
                if (state.profile) {
                    state.profile = { ...state.profile, isFollowing: false };
                }
            })
            .addCase(unfollowUserInStream.pending, (state) => {
                if (state.profile) {
                    state.profile = { ...state.profile, isFollowing: false };
                }
            })
            .addCase(unfollowUserInStream.fulfilled, (state) => {
                // Không cần cập nhật lại vì đã cập nhật trong pending
            })
            .addCase(unfollowUserInStream.rejected, (state) => {
                if (state.profile) {
                    state.profile = { ...state.profile, isFollowing: true };
                }
            });
    },
});

export const { clearProfile } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile, changePassword } from "../../service/api/profileApi";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        myProfile: {
            id: 342,
            username: "ripcode444",
            avatar: "https://www.bing.com/th/id/OIP.GDzD9q-sQFLKPcjBMUO…HaHa?w=150&h=150&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
            bio: "I am a software engineer",
            followersCount: 100,
            streamsCount: 10,
            reelsCount: 5,
            isStreaming: false,
            isFollowing: null,
            link: {
                youtube: "https://www.youtube.com",
                tiktok: "https://www.tiktok.com",
                discord: "https://www.discord.com",
            }
        },
        getProfileLoading: false,
        getProfileError: null,
        updateProfileLoading: false,
        updateProfileError: null,
        changePasswordLoading: false,
        changePasswordError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state) => {
                state.getProfileLoading = true;
                state.getProfileError = null;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.getProfileLoading = false;
                state.myProfile = action.payload;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.getProfileLoading = false;
                state.getProfileError = action.payload;
            })
            .addCase(updateMyProfile.pending, (state) => {
                state.updateProfileLoading = true;
                state.updateProfileError = null;
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.updateProfileLoading = false;
                state.myProfile = action.payload;
            })
            .addCase(updateMyProfile.rejected, (state, action) => {
                state.updateProfileLoading = false;
                state.updateProfileError = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.changePasswordLoading = true;
                state.changePasswordError = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.changePasswordLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.changePasswordLoading = false;
                state.changePasswordError = action.payload;
            });
    }
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile, changePassword } from "../../service/api/profileApi";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        myProfile: {
            id: 342,
            username: "",
            avatar: "",
            bio: "",
            followersCount: 0,
            streamsCount: 0,
            reelsCount: 0,
            isStreaming: false,
            isFollowing: false,
            link: {
                youtube: "",
                tiktok: "",
                discord: "",
            }
        },
        selectedNav: 1,
        getProfileLoading: false,
        getProfileError: null,
        updateProfileLoading: false,
        updateProfileError: null,
        changePasswordLoading: false,
        changePasswordError: null,
    },
    reducers: {
        setSelectedNav: (state, action) => {
            state.selectedNav = action.payload;
        }
    },
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

export const { setSelectedNav } = profileSlice.actions;
export default profileSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateMyProfile, changePassword, getProfile } from "../../service/api/profileApi";
import { followUserInChannel, getReels, getStreams, unfollowUserInChannel } from "../../service/api/channelApi";

export const channelProfileSlice = createSlice({
    name: "channelProfile",
    initialState: {
        channelProfile: {
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
                youtube: "https://www.youtube.com",
                tiktok: "https://www.tiktok.com",
                discord: "https://www.discord.com",
            }
        },
        selectedNav: 1,
        getProfileLoading: false,
        getProfileError: null,
        streams: [],
        reels: [],
    },
    reducers: {
        setSelectedNav: (state, action) => {
            state.selectedNav = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.getProfileLoading = true;
                state.getProfileError = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.getProfileLoading = false;
                state.channelProfile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.getProfileLoading = false;
                state.getProfileError = action.payload;
            })

            .addCase(followUserInChannel.pending, (state) => {
                state.channelProfile.isFollowing = true;
                state.channelProfile.followersCount += 1;
            })
            .addCase(followUserInChannel.rejected, (state) => {
                state.channelProfile.isFollowing = false;
                state.channelProfile.followersCount -= 1;
            })
            .addCase(unfollowUserInChannel.pending, (state) => {
                state.channelProfile.isFollowing = false;
                state.channelProfile.followersCount -= 1;
            })
            .addCase(unfollowUserInChannel.rejected, (state) => {
                state.channelProfile.isFollowing = true;
                state.channelProfile.followersCount += 1;
            })
            .addCase(getReels.fulfilled, (state, action) => {
                state.reels = action.payload.reels;
            })
            .addCase(getStreams.fulfilled, (state, action) => {
                state.streams = action.payload.streams;
            });
    }
});

export const { setSelectedNav } = channelProfileSlice.actions;
export default channelProfileSlice.reducer;
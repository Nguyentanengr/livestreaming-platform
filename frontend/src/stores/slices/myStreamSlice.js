import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, getMyStreams } from "../../service/api/profileApi";



const myStreamSlice = createSlice({

    name: "myStream",
    initialState: {
        myStreamLoading: false,
        myStreamError: null,
        myStream: {
            streams: [
                {
                    id: "stream1",
                    title: "Live Stream 1",
                    liveNotificatiosn: "Wel comme",
                    thumbnail: "/images/games/test.jpg",
                    video: "/videos/test.mp4",
                    viewersCount: 1000,
                    peakViewers: 2000,
                    totalViewers: 5000,
                    visibility: "PUBLIC",
                    commentEnabled: true,
                    startedAt: "3 hour ago",
                    endedAt: "2022-01-01T12:00:00",
                    tagNames: ["funny", "fighting"],
                    category: {
                        id: 1,
                        name: "Game",
                        thumbnail: "/images/games/test.jpg",
                    },
                    user: {
                        id: 1,
                        username: "User 1",
                        avatar: "https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg",
                        isStreaming: true,
                    }
                }
            ],
            currentPage: 0,
            totalPages: 1,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyStreams.pending, (state) => {
                state.myStreamLoading = true;
                state.myStreamError = null;
            })
            .addCase(getMyStreams.fulfilled, (state, action) => {
                state.myStreamLoading = false;
                console.log("action.payload", action.payload);
                state.myStream = action.payload;
            })
            .addCase(getMyStreams.rejected, (state, action) => {
                state.myStreamLoading = false;
                state.myStreamError = action.payload;
            });
    }
});

export const {

} = myStreamSlice.actions;

export default myStreamSlice.reducer;